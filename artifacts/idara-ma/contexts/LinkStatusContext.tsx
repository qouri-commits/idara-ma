import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { API_BASE_URL, LINK_CHECK_CACHE_MS } from "@/constants/config";

const CACHE_KEY = "link_status_cache";

interface CachedStatus {
  brokenServiceIds: string[];
  checkedAt: string;
  totalChecked: number;
}

interface LinkStatusContextValue {
  brokenServiceIds: Set<string>;
  isLinkBroken: (serviceId: string) => boolean;
  isLoading: boolean;
}

const LinkStatusContext = createContext<LinkStatusContextValue>({
  brokenServiceIds: new Set(),
  isLinkBroken: () => false,
  isLoading: false,
});

export function LinkStatusProvider({ children }: { children: React.ReactNode }) {
  const [brokenIds, setBrokenIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndCache = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/link-status`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return;
      const data: CachedStatus = await res.json();
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      setBrokenIds(new Set(data.brokenServiceIds));
    } catch {
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached: CachedStatus = JSON.parse(raw);
          if (!cancelled) setBrokenIds(new Set(cached.brokenServiceIds));

          const age = Date.now() - new Date(cached.checkedAt).getTime();
          if (age < LINK_CHECK_CACHE_MS) {
            if (!cancelled) setIsLoading(false);
            return;
          }
        }
      } catch {
      }

      if (!cancelled) {
        await fetchAndCache();
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchAndCache]);

  const isLinkBroken = useCallback(
    (serviceId: string) => brokenIds.has(serviceId),
    [brokenIds]
  );

  return (
    <LinkStatusContext.Provider value={{ brokenServiceIds: brokenIds, isLinkBroken, isLoading }}>
      {children}
    </LinkStatusContext.Provider>
  );
}

export function useLinkStatus() {
  return useContext(LinkStatusContext);
}
