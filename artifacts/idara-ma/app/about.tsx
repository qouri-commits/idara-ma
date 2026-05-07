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

export default function AboutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPadding, paddingBottom: Platform.OS === "web" ? 40 : insets.bottom + 40 },
        ]}
      >
        <TouchableOpacity
          style={[styles.back, { backgroundColor: colors.card, borderRadius: colors.radius - 4 }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-right" size={18} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>رجوع</Text>
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoBlock}>
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <Text style={styles.badgeText}>MA</Text>
          </View>
          <Text style={[styles.logoText, { color: colors.primary }]}>IDARA.ma</Text>
        </View>

        <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
          جميع خدمات الدولة المغربية فبلاصة وحدة
        </Text>

        {/* About card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: colors.radius, borderRightColor: colors.primary }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>شكون حنا؟</Text>
            <Feather name="info" size={18} color={colors.primary} />
          </View>
          <Text style={[styles.cardBody, { color: colors.foreground }]}>
            IDARA.ma دليل مستقل مغربي أسسه [اسم المؤسس] فـ 2026. الهدف: نبسطو الإدارة المغربية لكل مغربي وكل مغربية — بالدارجة، بدون تعقيد.
          </Text>
        </View>

        {/* Mission */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: colors.radius, borderRightColor: colors.accent }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>المهمة</Text>
            <Feather name="target" size={18} color={colors.accent} />
          </View>
          <Text style={[styles.cardBody, { color: colors.foreground }]}>
            كنجمعو روابط الخدمات الإلكترونية الرسمية للدولة المغربية، وكنشرحو كيفاش تخدمهم خطوة خطوة. حنا ما نمثلوش أي جهة حكومية.
          </Text>
        </View>

        {/* Stats */}
        <View style={[styles.statsRow]}>
          {[
            { n: "6", label: "أقسام" },
            { n: "20+", label: "خدمة" },
            { n: "100%", label: "مجاني" },
          ].map((s) => (
            <View key={s.label} style={[styles.stat, { backgroundColor: colors.card, borderRadius: colors.radius }]}>
              <Text style={[styles.statNum, { color: colors.accent }]}>{s.n}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Legal */}
        <View style={[styles.legalRow, { borderTopColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.push("/privacy")}>
            <Text style={[styles.legalLink, { color: colors.primary }]}>سياسة الخصوصية</Text>
          </TouchableOpacity>
          <Text style={[styles.dot, { color: colors.border }]}>•</Text>
          <TouchableOpacity onPress={() => router.push("/contact")}>
            <Text style={[styles.legalLink, { color: colors.primary }]}>تواصل معنا</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.copy, { color: colors.mutedForeground }]}>
          IDARA.ma © 2026
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, gap: 20 },
  back: {
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
  backText: { fontSize: 14, fontWeight: "600" },
  logoBlock: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 10,
  },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: "#fff", fontSize: 14, fontWeight: "700", letterSpacing: 1 },
  logoText: { fontSize: 36, fontWeight: "800", letterSpacing: -0.5 },
  tagline: { fontSize: 14, textAlign: "center", lineHeight: 22 },
  card: {
    padding: 16,
    borderRightWidth: 3,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: { flexDirection: "row-reverse", alignItems: "center", gap: 10 },
  cardTitle: { fontSize: 15, fontWeight: "700", flex: 1, textAlign: "right" },
  cardBody: { fontSize: 13, textAlign: "right", lineHeight: 21 },
  statsRow: { flexDirection: "row-reverse", gap: 10 },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statNum: { fontSize: 22, fontWeight: "800" },
  statLabel: { fontSize: 11, fontWeight: "600" },
  legalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  legalLink: { fontSize: 13, fontWeight: "600" },
  dot: { fontSize: 16 },
  copy: { fontSize: 11, textAlign: "center" },
});
