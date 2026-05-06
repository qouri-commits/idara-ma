import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "@idara_bookmarks_v1";

export interface BookmarkKey {
  categoryId: string;
  serviceId: string;
}

function toKey(b: BookmarkKey) {
  return `${b.categoryId}::${b.serviceId}`;
}

interface BookmarksContextValue {
  isBookmarked: (b: BookmarkKey) => boolean;
  toggleBookmark: (b: BookmarkKey) => void;
  bookmarkedKeys: Set<string>;
}

const BookmarksContext = createContext<BookmarksContextValue>({
  isBookmarked: () => false,
  toggleBookmark: () => {},
  bookmarkedKeys: new Set(),
});

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [keys, setKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setKeys(new Set(JSON.parse(raw) as string[]));
        } catch {}
      }
    });
  }, []);

  const toggleBookmark = useCallback((b: BookmarkKey) => {
    const k = toKey(b);
    setKeys((prev) => {
      const next = new Set(prev);
      if (next.has(k)) {
        next.delete(k);
      } else {
        next.add(k);
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (b: BookmarkKey) => keys.has(toKey(b)),
    [keys]
  );

  return (
    <BookmarksContext.Provider value={{ isBookmarked, toggleBookmark, bookmarkedKeys: keys }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
