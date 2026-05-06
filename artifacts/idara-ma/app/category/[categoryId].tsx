import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ServiceItem } from "@/components/ServiceItem";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { categories } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function CategoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();

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
      >
        {/* Back Button */}
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
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
            الخدمات المتاحة ({category.services.length})
          </Text>
          <View style={styles.servicesList}>
            {category.services.map((svc) => {
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingHorizontal: 16,
    gap: 24,
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
    paddingVertical: 8,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoryHeader: {
    alignItems: "flex-end",
    gap: 10,
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
  servicesSection: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
    letterSpacing: 0.5,
  },
  servicesList: {
    gap: 8,
  },
});
