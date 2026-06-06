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
import { QuickChip } from "@/components/QuickChip";
import { SearchBar } from "@/components/SearchBar";
import { SearchResultItem } from "@/components/SearchResultItem";
import { categories } from "@/constants/data";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useColors } from "@/hooks/useColors";

const QUICK_SERVICES: {
  label: string;
  categoryId: string;
  serviceId: string;
  icon: React.ComponentProps<typeof Feather>["name"];
}[] = [
  { label: "البطاقة الوطنية", categoryId: "hawiya", serviceId: "cnie-appointment", icon: "credit-card" },
  { label: "جواز السفر", categoryId: "hawiya", serviceId: "passport", icon: "book" },
  { label: "RSU", categoryId: "himaya", serviceId: "rsu", icon: "users" },
  { label: "السجل العدلي", categoryId: "adl", serviceId: "criminal-record", icon: "file-text" },
  { label: "Vignette", categoryId: "naql", serviceId: "vignette", icon: "tag" },
  { label: "CNSS", categoryId: "himaya", serviceId: "cnss-services", icon: "shield" },
  { label: "منحة Minhaty", categoryId: "taalim", serviceId: "scholarship", icon: "award" },
  { label: "دعم السكن", categoryId: "himaya", serviceId: "daam-sakan", icon: "home" },
];

const TOTAL_SERVICES = categories.reduce((s, c) => s + c.services.length, 0);

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
  const isSearching = query.trim() !== "";

  const renderCategories = () => {
    const rows: (typeof categories)[] = [];
    for (let i = 0; i < categories.length; i += 2) {
      rows.push(categories.slice(i, i + 2));
    }
    return rows;
  };

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
        {/* ─── Header ─── */}
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
              <Text style={styles.flagText}>🇲🇦</Text>
            </View>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* ─── Subtitle + Stats ─── */}
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          جميع خدمات الدولة المغربية فبلاصة وحدة
        </Text>
        <View style={styles.statsRow}>
          <View style={[styles.statPill, { backgroundColor: colors.secondary }]}>
            <Feather name="grid" size={11} color={colors.primary} />
            <Text style={[styles.statText, { color: colors.primary }]}>
              {categories.length} أقسام
            </Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: colors.secondary }]}>
            <Feather name="check-circle" size={11} color={colors.primary} />
            <Text style={[styles.statText, { color: colors.primary }]}>
              {TOTAL_SERVICES} خدمة رسمية
            </Text>
          </View>
        </View>

        {/* ─── Search ─── */}
        <View style={styles.searchWrapper}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery("")}
          />
        </View>

        {/* ─── Search Results ─── */}
        {isSearching && (
          <View style={styles.section}>
            {searchResults.length === 0 ? (
              <View style={styles.emptySearch}>
                <Feather name="search" size={32} color={colors.border} />
                <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                  ما كاين والو لـ "{query}"
                </Text>
                <Text style={[styles.emptyHint, { color: colors.mutedForeground }]}>
                  جرب تكتب: باكالوريا، CNSS، رخصة...
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

        {/* ─── Quick Access ─── */}
        {!isSearching && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="zap" size={13} color={colors.accent} />
              <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                الأكثر طلباً
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
              style={styles.chipsScroll}
            >
              {QUICK_SERVICES.map((q) => (
                <QuickChip
                  key={q.serviceId}
                  label={q.label}
                  icon={q.icon}
                  onPress={() =>
                    router.push({
                      pathname: "/service-detail",
                      params: { categoryId: q.categoryId, serviceId: q.serviceId },
                    })
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* ─── آخر ما شفتي ─── */}
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
                  <Feather name="clock" size={13} color={colors.border} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ─── Categories Grid ─── */}
        {!isSearching && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="grid" size={13} color={colors.mutedForeground} />
              <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                الأقسام
              </Text>
            </View>
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

        {/* ─── شكون حنا؟ ─── */}
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
              آخر تحديث: يونيو 2026
            </Text>
          </TouchableOpacity>
        )}

        {/* ─── Footer ─── */}
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
    marginBottom: 6,
  },
  headerStar: { padding: 4 },
  headerCenter: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  headerPlaceholder: { width: 30 },
  logo: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  flagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  flagText: { fontSize: 16 },

  subtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statText: {
    fontSize: 11,
    fontWeight: "700",
  },

  searchWrapper: { marginBottom: 22 },

  section: { gap: 10, marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-end",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "right",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  list: { gap: 8 },

  chipsScroll: { marginHorizontal: -16 },
  chipsRow: {
    flexDirection: "row-reverse",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  row: { flexDirection: "row-reverse", gap: 12 },
  cardPlaceholder: { flex: 1 },

  emptySearch: {
    paddingVertical: 28,
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  emptyHint: {
    fontSize: 12,
    textAlign: "center",
  },

  recentItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRightWidth: 3,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  recentContent: { flex: 1, gap: 2 },
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
