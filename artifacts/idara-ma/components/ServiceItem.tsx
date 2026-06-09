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
          backgroundColor: isBookmarked ? "#FFFDF0" : colors.card,
          borderRadius: colors.radius,
          borderRightColor: isBookmarked ? colors.accent : colors.primary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.chevron}>
        <Feather name="chevron-left" size={18} color={isBookmarked ? colors.accent : colors.primary} />
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.name, { color: isBookmarked ? colors.primary : colors.primary }]}
          numberOfLines={2}
        >
          {"\u200F"}{name}
        </Text>
        <View style={styles.meta}>
          {hasWarning && (
            <View style={[styles.warnPill, { backgroundColor: "#FEF3C7" }]}>
              <Feather name="alert-triangle" size={10} color="#D97706" />
              <Text style={styles.warnText}>تنبيه</Text>
            </View>
          )}
          <Text style={[styles.source, { color: colors.mutedForeground }]}>
            {source}
          </Text>
        </View>
      </View>

      {onToggleBookmark && (
        <TouchableOpacity
          onPress={handleBookmark}
          hitSlop={12}
          style={[
            styles.starBtn,
            isBookmarked && { backgroundColor: "#FFF8D6", borderRadius: 20 },
          ]}
        >
          <Feather
            name="star"
            size={17}
            color={isBookmarked ? "#FFC107" : colors.border}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 13,
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
    width: 22,
    alignItems: "center",
  },
  starBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 5,
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
    gap: 6,
  },
  source: {
    fontSize: 11,
    textAlign: "right",
  },
  warnPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  warnText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#D97706",
  },
});
