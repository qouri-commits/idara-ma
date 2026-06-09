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
      activeOpacity={0.75}
    >
      {bookmarkedCount > 0 && (
        <View style={[styles.badge, { backgroundColor: colors.accent }]}>
          <Text style={[styles.badgeNum, { color: "#fff" }]}>
            ★ {bookmarkedCount}
          </Text>
        </View>
      )}

      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.secondary, borderRadius: colors.radius - 2 },
        ]}
      >
        <Feather name={iconName} size={28} color={colors.primary} />
      </View>

      <Text style={[styles.title, { color: colors.primary }]} numberOfLines={2}>
        {"\u200F"}{title}
      </Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>
        {"\u200F"}{description}
      </Text>

      <View style={styles.footer}>
        <View style={[styles.countPill, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.countText, { color: colors.primary }]}>
            {serviceCount} خدمة
          </Text>
        </View>
        <Feather name="chevron-left" size={15} color={colors.accent} />
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 3,
    gap: 9,
    position: "relative",
    minHeight: 158,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 9,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeNum: { fontSize: 10, fontWeight: "800" },
  iconContainer: {
    width: 52,
    height: 52,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 14, fontWeight: "800", textAlign: "right", lineHeight: 20 },
  description: { fontSize: 11, textAlign: "right", lineHeight: 16, flex: 1 },
  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  countText: { fontSize: 10, fontWeight: "700" },
});
