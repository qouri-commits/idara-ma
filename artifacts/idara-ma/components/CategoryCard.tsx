import { Feather } from "@expo/vector-icons";
import {
  Car,
  GraduationCap,
  HeartHandshake,
  Home,
  Scale,
  UserRound,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";

const LUCIDE_MAP: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  hawiya: UserRound,
  adl: Scale,
  himaya: HeartHandshake,
  naql: Car,
  aqar: Home,
  taalim: GraduationCap,
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
  const LucideIcon = LUCIDE_MAP[categoryId];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderRightColor: colors.accent,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {bookmarkedCount > 0 && (
        <View style={[styles.badge, { backgroundColor: "#FFC107" }]}>
          <Feather name="star" size={9} color="#fff" />
          <Text style={styles.badgeNum}>{bookmarkedCount}</Text>
        </View>
      )}

      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.secondary, borderRadius: colors.radius - 4 },
        ]}
      >
        {LucideIcon ? (
          <LucideIcon size={28} color={colors.primary} />
        ) : (
          <Feather name="grid" size={28} color={colors.primary} />
        )}
      </View>

      <Text style={[styles.title, { color: colors.primary }]} numberOfLines={2}>
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.count, { color: colors.accent }]}>
          {serviceCount} خدمات
        </Text>
        <Feather name="chevron-left" size={16} color={colors.accent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    flex: 1,
    borderRightWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeNum: { fontSize: 10, color: "#fff", fontWeight: "700" },
  iconContainer: {
    width: 52,
    height: 52,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 15, fontWeight: "700", textAlign: "right", lineHeight: 22 },
  description: { fontSize: 12, textAlign: "right", lineHeight: 18 },
  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  count: { fontSize: 12, fontWeight: "600" },
});
