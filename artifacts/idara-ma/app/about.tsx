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

import { categories } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const APP_VERSION = "1.0.0";
const TOTAL_SERVICES = categories.reduce((s, c) => s + c.services.length, 0);
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=ma.idara.app";

export default function AboutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;

  const openPlayStore = () => Linking.openURL(PLAY_STORE_URL);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: topPadding,
            paddingBottom: Platform.OS === "web" ? 40 : insets.bottom + 40,
          },
        ]}
      >
        {/* Back */}
        <TouchableOpacity
          style={[
            styles.back,
            { backgroundColor: colors.card, borderRadius: colors.radius - 4 },
          ]}
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
          <Text style={[styles.logoText, { color: colors.primary }]}>
            IDARA.ma
          </Text>
        </View>

        <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
          جميع خدمات الدولة المغربية فبلاصة وحدة
        </Text>

        {/* Version pill */}
        <View style={styles.versionRow}>
          <View
            style={[
              styles.versionPill,
              { backgroundColor: colors.secondary, borderRadius: 20 },
            ]}
          >
            <Feather name="package" size={12} color={colors.primary} />
            <Text style={[styles.versionText, { color: colors.primary }]}>
              الإصدار {APP_VERSION}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { n: String(categories.length), label: "أقسام", icon: "grid" as const },
            { n: String(TOTAL_SERVICES), label: "خدمة", icon: "check-circle" as const },
            { n: "100%", label: "مجاني", icon: "heart" as const },
          ].map((s) => (
            <View
              key={s.label}
              style={[
                styles.stat,
                { backgroundColor: colors.card, borderRadius: colors.radius },
              ]}
            >
              <Feather name={s.icon} size={16} color={colors.accent} />
              <Text style={[styles.statNum, { color: colors.primary }]}>
                {s.n}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        {/* About card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderRadius: colors.radius,
              borderRightColor: colors.primary,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>
              شكون حنا؟
            </Text>
            <Feather name="info" size={18} color={colors.primary} />
          </View>
          <Text style={[styles.cardBody, { color: colors.foreground }]}>
            {"\u200F"}
            IDARA.ma دليل مستقل مغربي أُسّس فـ 2026. الهدف: نبسّطو الإدارة المغربية لكل مغربي وكل مغربية — بالدارجة، بدون تعقيد.
          </Text>
        </View>

        {/* Mission card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderRadius: colors.radius,
              borderRightColor: colors.accent,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>
              المهمة
            </Text>
            <Feather name="target" size={18} color={colors.accent} />
          </View>
          <Text style={[styles.cardBody, { color: colors.foreground }]}>
            {"\u200F"}
            كنجمعو روابط الخدمات الإلكترونية الرسمية للدولة المغربية، وكنشرحو كيفاش تخدمهم. حنا ما نمثلوش أي جهة حكومية — هاد التطبيق مستقل بالكامل.
          </Text>
        </View>

        {/* Rate on Play Store */}
        <TouchableOpacity
          style={[
            styles.rateBtn,
            { backgroundColor: colors.primary, borderRadius: colors.radius },
          ]}
          onPress={openPlayStore}
          activeOpacity={0.85}
        >
          <Feather name="star" size={18} color="#FFC107" />
          <Text style={styles.rateBtnText}>قيّم التطبيق على Google Play</Text>
          <Feather name="external-link" size={15} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

        {/* Share feedback card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderRadius: colors.radius,
              borderRightColor: colors.primary,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>
              ملاحظة أو اقتراح؟
            </Text>
            <Feather name="message-circle" size={18} color={colors.primary} />
          </View>
          <Text style={[styles.cardBody, { color: colors.foreground }]}>
            إذا لاحظت خطأ في رابط أو بغيت تقترح خدمة جديدة، تواصل معنا عبر صفحة التواصل.
          </Text>
          <TouchableOpacity
            style={[
              styles.contactBtn,
              {
                backgroundColor: colors.secondary,
                borderRadius: colors.radius - 4,
              },
            ]}
            onPress={() => router.push("/contact")}
            activeOpacity={0.7}
          >
            <Text style={[styles.contactBtnText, { color: colors.primary }]}>
              تواصل معنا
            </Text>
            <Feather name="chevron-left" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Legal row */}
        <View style={[styles.legalRow, { borderTopColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.push("/privacy")}>
            <Text style={[styles.legalLink, { color: colors.primary }]}>
              سياسة الخصوصية
            </Text>
          </TouchableOpacity>
          <Text style={[styles.dot, { color: colors.border }]}>•</Text>
          <TouchableOpacity onPress={() => router.push("/contact")}>
            <Text style={[styles.legalLink, { color: colors.primary }]}>
              تواصل معنا
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.copy, { color: colors.mutedForeground }]}>
          IDARA.ma © 2026 — جميع الحقوق محفوظة
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, gap: 18 },
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
    paddingTop: 6,
  },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: {
    color: "#1A2B30",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
  logoText: { fontSize: 36, fontWeight: "800", letterSpacing: -0.5 },
  tagline: { fontSize: 14, textAlign: "center", lineHeight: 22 },
  versionRow: { alignItems: "center" },
  versionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  versionText: { fontSize: 12, fontWeight: "600" },
  statsRow: { flexDirection: "row-reverse", gap: 10 },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statNum: { fontSize: 20, fontWeight: "800" },
  statLabel: { fontSize: 11, fontWeight: "600" },
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
  rateBtn: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    shadowColor: "#0F4C5C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  rateBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  contactBtn: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
  },
  contactBtnText: { fontSize: 13, fontWeight: "600" },
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
  copy: { fontSize: 11, textAlign: "center", paddingBottom: 4 },
});
