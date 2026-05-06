import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { SearchResultItem } from "@/components/SearchResultItem";
import { categories } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

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

  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;

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
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 24,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.logo, { color: colors.primary }]}>IDARA.ma</Text>
          <View
            style={[styles.flagBadge, { backgroundColor: colors.accent }]}
          >
            <Text style={styles.flagText}>MA</Text>
          </View>
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
        {query.trim() !== "" && (
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
                <View style={styles.resultsList}>
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
                          params: {
                            categoryId: r.categoryId,
                            serviceId: r.serviceId,
                          },
                        })
                      }
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {/* Categories Grid */}
        {query.trim() === "" && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              الأقسام
            </Text>
            {renderCategories().map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    title={cat.title}
                    description={cat.description}
                    icon={cat.icon}
                    serviceCount={cat.services.length}
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

        {/* Footer */}
        {query.trim() === "" && (
          <View
            style={[
              styles.footer,
              { borderTopColor: colors.border },
            ]}
          >
            <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
              IDARA.ma — دليل مستقل كيجمع الروابط الرسمية فقط
            </Text>
            <Text style={[styles.footerSub, { color: colors.mutedForeground }]}>
              ماي 2026
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 4,
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
  searchWrapper: {
    marginBottom: 24,
  },
  section: {
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row-reverse",
    gap: 12,
  },
  cardPlaceholder: {
    flex: 1,
  },
  resultsList: {
    gap: 8,
  },
  emptySearch: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 20,
    gap: 4,
    alignItems: "center",
  },
  footerText: {
    fontSize: 11,
    textAlign: "center",
  },
  footerSub: {
    fontSize: 10,
    textAlign: "center",
  },
});
