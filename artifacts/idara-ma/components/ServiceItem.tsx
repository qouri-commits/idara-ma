import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface ServiceItemProps {
  name: string;
  source: string;
  hasWarning?: boolean;
  isBookmarked?: boolean;
  onPress: () => void;
  onToggleBookmark?: () => void;
}

export function ServiceItem({
  name,
  source,
  hasWarning,
  isBookmarked,
  onPress,
  onToggleBookmark,
}: ServiceItemProps) {
  const colors = useColors();

  const handleBookmark = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggleBookmark?.();
  };

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
      {/* Star button on the left (RTL = visual left) */}
      {onToggleBookmark && (
        <TouchableOpacity onPress={handleBookmark} hitSlop={12} style={styles.starBtn}>
          <Feather
            name="star"
            size={18}
            color={isBookmarked ? "#f59e0b" : colors.border}
            fill={isBookmarked ? "#f59e0b" : "none"}
          />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.primary }]} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.meta}>
          {hasWarning && (
            <Feather
              name="alert-triangle"
              size={12}
              color={colors.warningBorder}
              style={styles.warnIcon}
            />
          )}
          <Text style={[styles.source, { color: colors.mutedForeground }]}>
            {source}
          </Text>
        </View>
      </View>

      <View style={styles.chevron}>
        <Feather name="chevron-left" size={18} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRightWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    gap: 10,
  },
  chevron: {
    width: 24,
    alignItems: "center",
  },
  starBtn: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
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
