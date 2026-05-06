import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ServiceItem } from "@/components/ServiceItem";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { categories } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function BookmarksScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { bookmarkedKeys, isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarkedServices = categories.flatMap((cat) =>
    cat.services
      .filter((svc) => isBookmarked({ categoryId: cat.id, serviceId: svc.id }))
      .map((svc) => ({ cat, svc }))
  );

  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: topPadding,
            paddingBottom: Platform.OS === "web" ? 90 : insets.bottom + 80,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Feather name="star" size={22} color="#f59e0b" />
          <Text style={[styles.title, { color: colors.primary }]}>المفضلة ديالي</Text>
        </View>

        {bookmarkedServices.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="star" size={48} color={colors.border} />
            <Text style={[styles.emptyTitle, { color: colors.primary }]}>
              ما زيدتي والو للمفضلة
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
              دوس على النجمة ⭐ حدا أي خدمة باش تحفظها هنا
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            <Text style={[styles.count, { color: colors.mutedForeground }]}>
              {bookmarkedServices.length} خدمة محفوظة
            </Text>
            {bookmarkedServices.map(({ cat, svc }) => (
              <ServiceItem
                key={`${cat.id}-${svc.id}`}
                name={svc.name}
                source={svc.source}
                hasWarning={!!svc.warning}
                isBookmarked
                onToggleBookmark={() =>
                  toggleBookmark({ categoryId: cat.id, serviceId: svc.id })
                }
                onPress={() =>
                  router.push({
                    pathname: "/service-detail",
                    params: { categoryId: cat.id, serviceId: svc.id },
                  })
                }
              />
            ))}
          </View>
        )}
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
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "right",
  },
  empty: {
    alignItems: "center",
    gap: 14,
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  list: {
    gap: 8,
  },
  count: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
    letterSpacing: 0.5,
  },
});
