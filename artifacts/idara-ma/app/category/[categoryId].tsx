import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AdBanner } from "@/components/AdBanner";
import { ServiceItem } from "@/components/ServiceItem";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useLinkStatus } from "@/contexts/LinkStatusContext";
import { categories } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function CategoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isLinkBroken } = useLinkStatus();
  const [filter, setFilter] = useState("");

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>
          القسم غير موجود
        </Text>
      </View>
    );
  }

  const visibleServices = category.services
    .filter((svc) => !isLinkBroken(svc.id))
    .filter((svc) =>
      filter.trim()
        ? svc.name.toLowerCase().includes(filter.toLowerCase()) ||
          svc.source.toLowerCase().includes(filter.toLowerCase())
        : true
    );

  const bookmarkedCount = category.services.filter((svc) =>
    isBookmarked({ categoryId: category.id, serviceId: svc.id })
  ).length;

  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;

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
        {/* Back */}
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: colors.card, borderRadius: colors.radius - 4 },
          ]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-right" size={18} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>رجوع</Text>
        </TouchableOpacity>

        {/* Category Header */}
        <View style={styles.categoryHeader}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: colors.secondary, borderRadius: colors.radius },
            ]}
          >
            <Feather name={category.icon as any} size={32} color={colors.primary} />
          </View>
          <Text style={[styles.categoryTitle, { color: colors.primary }]}>
            {category.title}
          </Text>
          <Text style={[styles.categoryDesc, { color: colors.mutedForeground }]}>
            {category.description}
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={[styles.statPill, { backgroundColor: colors.secondary }]}>
              <Feather name="list" size={11} color={colors.primary} />
              <Text style={[styles.statText, { color: colors.primary }]}>
                {category.services.length} خدمة
              </Text>
            </View>
            {bookmarkedCount > 0 && (
              <View style={[styles.statPill, { backgroundColor: "#FFF8D6" }]}>
                <Feather name="star" size={11} color="#FFC107" />
                <Text style={[styles.statText, { color: "#78560A" }]}>
                  {bookmarkedCount} محفوظة
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Filter bar (only for categories with many services) */}
        {category.services.length >= 6 && (
          <View
            style={[
              styles.filterBar,
              {
                backgroundColor: colors.card,
                borderRadius: colors.radius,
                borderColor: filter ? colors.primary : colors.border,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setFilter("")} style={styles.filterIcon}>
              <Feather
                name={filter ? "x" : "search"}
                size={16}
                color={filter ? colors.primary : colors.mutedForeground}
              />
            </TouchableOpacity>
            <TextInput
              value={filter}
              onChangeText={setFilter}
              placeholder="فلتر الخدمات..."
              placeholderTextColor={colors.mutedForeground}
              style={[styles.filterInput, { color: colors.primary }]}
              textAlign="right"
            />
          </View>
        )}

        {/* Ad Banner */}
        <AdBanner topMargin={0} bottomMargin={4} />

        {/* Services */}
        <View style={styles.servicesSection}>
          {filter.trim() ? (
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              {visibleServices.length} نتيجة
            </Text>
          ) : (
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              الخدمات المتاحة ({category.services.length})
            </Text>
          )}

          {visibleServices.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="inbox" size={32} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                ما كاين والو
              </Text>
            </View>
          ) : (
            <View style={styles.servicesList}>
              {visibleServices.map((svc) => {
                const key = { categoryId: category.id, serviceId: svc.id };
                return (
                  <ServiceItem
                    key={svc.id}
                    name={svc.name}
                    source={svc.source}
                    hasWarning={!!svc.warning}
                    isBookmarked={isBookmarked(key)}
                    onToggleBookmark={() => toggleBookmark(key)}
                    onPress={() =>
                      router.push({
                        pathname: "/service-detail",
                        params: { categoryId: category.id, serviceId: svc.id },
                      })
                    }
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingHorizontal: 16,
    gap: 20,
  },
  errorText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  backText: { fontSize: 14, fontWeight: "600" },

  categoryHeader: {
    alignItems: "flex-end",
    gap: 8,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "right",
    lineHeight: 30,
  },
  categoryDesc: {
    fontSize: 13,
    textAlign: "right",
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row-reverse",
    gap: 8,
    marginTop: 4,
  },
  statPill: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statText: { fontSize: 11, fontWeight: "700" },

  filterBar: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1.5,
  },
  filterIcon: { padding: 4 },
  filterInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 8,
  },

  servicesSection: { gap: 10 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
    letterSpacing: 0.5,
  },
  servicesList: { gap: 8 },
  emptyState: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
});
