import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { SearchResultItem } from "@/components/SearchResultItem";
import { categories } from "@/constants/data";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const { recentItems } = useRecentlyViewed();
  const { isBookmarked } = useBookmarks();

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    const results: {
      categoryId: string;
      serviceId: string;
      categoryTitle: string;
      serviceName: string;
      source: string;
      hasWarning: boolean;
    }[] = [];
    for (const cat of categories) {
      for (const svc of cat.services) {
        if (
          svc.name.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q) ||
          svc.source.toLowerCase().includes(q) ||
          svc.docs.toLowerCase().includes(q)
        ) {
          results.push({
            categoryId: cat.id,
            serviceId: svc.id,
            categoryTitle: cat.title,
            serviceName: svc.name,
            source: svc.source,
            hasWarning: !!svc.warning,
          });
        }
      }
    }
    return results;
  }, [query]);

  const resolvedRecent = useMemo(
    () =>
      recentItems
        .map((item) => {
          const cat = categories.find((c) => c.id === item.categoryId);
          const svc = cat?.services.find((s) => s.id === item.serviceId);
          if (!cat || !svc) return null;
          return { cat, svc, ...item };
        })
        .filter(Boolean) as {
        categoryId: string;
        serviceId: string;
        cat: (typeof categories)[0];
        svc: (typeof categories)[0]["services"][0];
      }[],
    [recentItems]
  );

  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;

  const renderCategories = () => {
    const rows: (typeof categories)[] = [];
    for (let i = 0; i < categories.length; i += 2) {
      rows.push(categories.slice(i, i + 2));
    }
    return rows;
  };

  const isSearching = query.trim() !== "";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: topPadding,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 80,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/bookmarks")}
            hitSlop={12}
            style={styles.headerStar}
          >
            <Feather name="star" size={22} color="#FFC107" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.logo, { color: colors.primary }]}>IDARA.ma</Text>
            <View style={[styles.flagBadge, { backgroundColor: colors.accent }]}>
              <Text style={styles.flagText}>MA</Text>
            </View>
          </View>
          <View style={styles.headerPlaceholder} />
        </View>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          جميع خدمات الدولة المغربية فبلاصة وحدة
        </Text>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery("")}
          />
        </View>

        {/* Search Results */}
        {isSearching && (
          <View style={styles.section}>
            {searchResults.length === 0 ? (
              <View style={styles.emptySearch}>
                <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                  ما كاين والو لـ "{query}"
                </Text>
              </View>
            ) : (
              <>
                <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                  {searchResults.length} نتيجة
                </Text>
                <View style={styles.list}>
                  {searchResults.map((r) => (
                    <SearchResultItem
                      key={`${r.categoryId}-${r.serviceId}`}
                      serviceName={r.serviceName}
                      categoryTitle={r.categoryTitle}
                      source={r.source}
                      hasWarning={r.hasWarning}
                      onPress={() =>
                        router.push({
                          pathname: "/service-detail",
                          params: { categoryId: r.categoryId, serviceId: r.serviceId },
                        })
                      }
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {/* آخر ما شفتي */}
        {!isSearching && resolvedRecent.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="clock" size={13} color={colors.mutedForeground} />
              <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                آخر ما شفتي
              </Text>
            </View>
            <View style={styles.list}>
              {resolvedRecent.map((item) => (
                <TouchableOpacity
                  key={`${item.categoryId}-${item.serviceId}`}
                  style={[
                    styles.recentItem,
                    {
                      backgroundColor: colors.card,
                      borderRadius: colors.radius,
                      borderRightColor: colors.accent,
                    },
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/service-detail",
                      params: {
                        categoryId: item.categoryId,
                        serviceId: item.serviceId,
                      },
                    })
                  }
                  activeOpacity={0.75}
                >
                  <Feather name="chevron-left" size={16} color={colors.mutedForeground} />
                  <View style={styles.recentContent}>
                    <Text
                      style={[styles.recentName, { color: colors.primary }]}
                      numberOfLines={1}
                    >
                      {item.svc.name}
                    </Text>
                    <Text
                      style={[styles.recentCat, { color: colors.mutedForeground }]}
                      numberOfLines={1}
                    >
                      {item.cat.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Categories Grid */}
        {!isSearching && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              الأقسام
            </Text>
            {renderCategories().map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    categoryId={cat.id}
                    title={cat.title}
                    description={cat.description}
                    icon={cat.icon}
                    serviceCount={cat.services.length}
                    bookmarkedCount={cat.services.filter((s) =>
                      isBookmarked({ categoryId: cat.id, serviceId: s.id })
                    ).length}
                    onPress={() =>
                      router.push({
                        pathname: "/category/[categoryId]",
                        params: { categoryId: cat.id },
                      })
                    }
                  />
                ))}
                {row.length === 1 && <View style={styles.cardPlaceholder} />}
              </View>
            ))}
          </View>
        )}

        {/* AD_SLOT — بلاصة AdMob من بعد */}
        {!isSearching && <View style={styles.adSlot} />}

        {/* شكون حنا؟ */}
        {!isSearching && (
          <TouchableOpacity
            style={[
              styles.aboutCard,
              {
                backgroundColor: colors.card,
                borderRadius: colors.radius,
                borderRightColor: colors.primary,
              },
            ]}
            onPress={() => router.push("/about")}
            activeOpacity={0.85}
          >
            <View style={styles.aboutHeader}>
              <Feather name="chevron-left" size={15} color={colors.mutedForeground} />
              <Feather name="info" size={15} color={colors.primary} />
              <Text style={[styles.aboutTitle, { color: colors.primary }]}>
                شكون حنا؟
              </Text>
            </View>
            <Text style={[styles.aboutLine, { color: colors.foreground }]}>
              IDARA.ma دليل مستقل بالدارجة. كنجمعو ليك روابط الخدمات الرسمية فبلاصة وحدة باش ما تلفش.
            </Text>
            <Text style={[styles.aboutUpdate, { color: colors.mutedForeground }]}>
              آخر تحديث: ماي 2026
            </Text>
          </TouchableOpacity>
        )}

        {/* Footer */}
        {!isSearching && (
          <View style={styles.footerRow}>
            <TouchableOpacity onPress={() => router.push("/privacy")}>
              <Text style={[styles.footerLink, { color: colors.mutedForeground }]}>الخصوصية</Text>
            </TouchableOpacity>
            <Text style={[styles.footerDot, { color: colors.border }]}>•</Text>
            <TouchableOpacity onPress={() => router.push("/contact")}>
              <Text style={[styles.footerLink, { color: colors.mutedForeground }]}>تواصل معنا</Text>
            </TouchableOpacity>
            <Text style={[styles.footerDot, { color: colors.border }]}>•</Text>
            <Text style={[styles.footerCopy, { color: colors.mutedForeground }]}>IDARA.ma © 2026</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerStar: {
    padding: 4,
  },
  headerCenter: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  headerPlaceholder: {
    width: 30,
  },
  logo: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  flagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  flagText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  searchWrapper: { marginBottom: 24 },
  section: {
    gap: 10,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-end",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  list: { gap: 8 },
  row: {
    flexDirection: "row-reverse",
    gap: 12,
  },
  cardPlaceholder: { flex: 1 },
  emptySearch: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
  recentItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRightWidth: 3,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  recentContent: {
    flex: 1,
    gap: 2,
  },
  recentName: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
  },
  recentCat: {
    fontSize: 11,
    textAlign: "right",
  },
  aboutCard: {
    padding: 16,
    borderRightWidth: 4,
    gap: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  aboutHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 7,
  },
  aboutTitle: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "right",
  },
  aboutLine: {
    fontSize: 13,
    textAlign: "right",
    lineHeight: 21,
  },
  aboutUpdate: {
    fontSize: 11,
    textAlign: "right",
    marginTop: 2,
  },
  adSlot: {
    height: 50,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 8,
  },
  footerLink: { fontSize: 11, fontWeight: "600" },
  footerDot: { fontSize: 12 },
  footerCopy: { fontSize: 11 },
});
