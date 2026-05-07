import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";

const FEATHER_MAP: Record<string, React.ComponentProps<typeof Feather>["name"]> = {
  hawiya: "user",
  adl: "briefcase",
  himaya: "shield",
  naql: "truck",
  aqar: "home",
  taalim: "book-open",
};

interface CategoryCardProps {
  categoryId: string;
  title: string;
  description: string;
  icon: string;
  serviceCount: number;
  bookmarkedCount?: number;
  onPress: () => void;
}

export function CategoryCard({
  categoryId,
  title,
  description,
  serviceCount,
  bookmarkedCount = 0,
  onPress,
}: CategoryCardProps) {
  const colors = useColors();
  const iconName = FEATHER_MAP[categoryId] ?? "grid";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderTopColor: colors.accent,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.78}
    >
      {bookmarkedCount > 0 && (
        <View style={[styles.badge, { backgroundColor: colors.accent }]}>
          <Text style={[styles.badgeNum, { color: colors.accentForeground }]}>
            {bookmarkedCount}★
          </Text>
        </View>
      )}

      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.secondary, borderRadius: colors.radius - 2 },
        ]}
      >
        <Feather name={iconName} size={26} color={colors.primary} />
      </View>

      <Text style={[styles.title, { color: colors.primary }]} numberOfLines={2}>
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.count, { color: colors.mutedForeground }]}>
          {serviceCount} خدمات
        </Text>
        <Feather name="chevron-left" size={14} color={colors.accent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    flex: 1,
    borderTopWidth: 3,
    shadowColor: "#0F4C5C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    gap: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeNum: { fontSize: 10, fontWeight: "700" },
  iconContainer: {
    width: 48,
    height: 48,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 14, fontWeight: "700", textAlign: "right", lineHeight: 20 },
  description: { fontSize: 11, textAlign: "right", lineHeight: 17 },
  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  count: { fontSize: 11, fontWeight: "500" },
});
