import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "@idara_recent_v1";
const MAX_ITEMS = 3;

export interface RecentItem {
  categoryId: string;
  serviceId: string;
}

interface RecentlyViewedContextValue {
  recentItems: RecentItem[];
  addRecent: (item: RecentItem) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue>({
  recentItems: [],
  addRecent: () => {},
});

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setRecentItems(JSON.parse(raw) as RecentItem[]);
        } catch {}
      }
    });
  }, []);

  const addRecent = useCallback((item: RecentItem) => {
    setRecentItems((prev) => {
      const filtered = prev.filter(
        (r) => !(r.categoryId === item.categoryId && r.serviceId === item.serviceId)
      );
      const next = [item, ...filtered].slice(0, MAX_ITEMS);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentItems, addRecent }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}
