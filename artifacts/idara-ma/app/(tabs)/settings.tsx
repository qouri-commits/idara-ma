import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const ITEMS = [
  {
    group: "التطبيق",
    rows: [
      { icon: "info" as const, label: "شكون حنا؟", route: "/about" },
      { icon: "mail" as const, label: "تواصل معنا", route: "/contact" },
      { icon: "lock" as const, label: "سياسة الخصوصية", route: "/privacy" },
    ],
  },
  {
    group: "المساهمة",
    rows: [
      {
        icon: "alert-triangle" as const,
        label: "بلغ عن رابط خاسر",
        route: "/contact",
      },
    ],
  },
];

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
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
          <Feather name="settings" size={22} color={colors.primary} />
          <Text style={[styles.title, { color: colors.primary }]}>الإعدادات</Text>
        </View>

        {ITEMS.map((group) => (
          <View key={group.group} style={styles.group}>
            <Text style={[styles.groupLabel, { color: colors.mutedForeground }]}>
              {group.group}
            </Text>
            <View
              style={[
                styles.groupCard,
                { backgroundColor: colors.card, borderRadius: colors.radius },
              ]}
            >
              {group.rows.map((row, i) => (
                <TouchableOpacity
                  key={row.label}
                  style={[
                    styles.row,
                    i < group.rows.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border,
                    },
                  ]}
                  onPress={() => router.push(row.route as any)}
                  activeOpacity={0.7}
                >
                  <Feather name="chevron-left" size={16} color={colors.mutedForeground} />
                  <Text style={[styles.rowLabel, { color: colors.foreground }]}>
                    {row.label}
                  </Text>
                  <View
                    style={[
                      styles.iconWrap,
                      { backgroundColor: colors.secondary, borderRadius: colors.radius - 6 },
                    ]}
                  >
                    <Feather name={row.icon} size={15} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
            IDARA.ma © 2026
          </Text>
          <Text style={[styles.version, { color: colors.mutedForeground }]}>
            الإصدار 1.0.0 — ماي 2026
          </Text>
          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
            دليل مستقل. لسنا جهة حكومية.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, gap: 20 },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
  },
  title: { fontSize: 24, fontWeight: "800", textAlign: "right" },
  group: { gap: 8 },
  groupLabel: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "right",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  groupCard: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },
  footer: { alignItems: "center", gap: 4, paddingTop: 8 },
  footerText: { fontSize: 13, fontWeight: "600" },
  version: { fontSize: 11 },
  disclaimer: { fontSize: 11 },
});
