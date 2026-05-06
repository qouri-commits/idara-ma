import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  serviceCount: number;
  onPress: () => void;
}

export function CategoryCard({
  title,
  description,
  icon,
  serviceCount,
  onPress,
}: CategoryCardProps) {
  const colors = useColors();

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
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.secondary, borderRadius: colors.radius - 4 },
        ]}
      >
        <Feather name={icon as any} size={24} color={colors.primary} />
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
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "right",
    lineHeight: 22,
  },
  description: {
    fontSize: 12,
    textAlign: "right",
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  count: {
    fontSize: 12,
    fontWeight: "600",
  },
});
