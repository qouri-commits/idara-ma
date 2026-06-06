import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useColors } from "@/hooks/useColors";

interface QuickChipProps {
  label: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  onPress: () => void;
}

export function QuickChip({ label, icon, onPress }: QuickChipProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.chip,
        {
          backgroundColor: colors.card,
          borderRadius: 24,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.label, { color: colors.primary }]}>{label}</Text>
      <Feather name={icon} size={14} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    shadowColor: "#0F4C5C",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
});
