import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface ServiceItemProps {
  name: string;
  source: string;
  hasWarning?: boolean;
  onPress: () => void;
}

export function ServiceItem({ name, source, hasWarning, onPress }: ServiceItemProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderRightColor: colors.primary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.left}>
        <Feather name="chevron-left" size={18} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.primary }]} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.meta}>
          {hasWarning && (
            <Feather name="alert-triangle" size={12} color={colors.warningBorder} style={styles.warnIcon} />
          )}
          <Text style={[styles.source, { color: colors.mutedForeground }]}>
            {source}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 14,
    borderRightWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    gap: 12,
  },
  left: {
    width: 28,
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    lineHeight: 20,
  },
  meta: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 4,
  },
  source: {
    fontSize: 11,
    textAlign: "right",
  },
  warnIcon: {
    marginLeft: 2,
  },
});
