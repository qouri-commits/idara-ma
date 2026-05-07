import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const SECTIONS = [
  {
    icon: "shield" as const,
    title: "لا نجمع أي بيانات",
    body: "IDARA.ma ما كيجمعش أي معلومة شخصية. ما عندناش حسابات، ما عندناش سيرفر يخزن بياناتك.",
  },
  {
    icon: "database" as const,
    title: "التخزين المحلي فقط",
    body: "المفضلة وآخر الخدمات اللي شفتيها كتتخزن فـ هاتفك فقط (AsyncStorage). ما تتصيفطش لأي مكان.",
  },
  {
    icon: "link" as const,
    title: "روابط خارجية",
    body: "كنوجهك للمواقع الرسمية للدولة المغربية. ملي تدوس على رابط، تمشي لموقع حكومي مستقل. سياسة الخصوصية ديالهم هي اللي تطبق.",
  },
  {
    icon: "alert-circle" as const,
    title: "ما نمثلوش الحكومة",
    body: "IDARA.ma دليل مستقل. لسنا جهة حكومية. ما عندناش علاقة رسمية مع أي وزارة أو مؤسسة عمومية.",
  },
  {
    icon: "refresh-cw" as const,
    title: "تحديثات السياسة",
    body: "إلا غيرنا هاد السياسة، غانعلنو فـ التطبيق. آخر تحديث: ماي 2026.",
  },
];

export default function PrivacyScreen() {
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

        <View style={styles.titleRow}>
          <Feather name="lock" size={28} color={colors.primary} />
          <Text style={[styles.title, { color: colors.primary }]}>سياسة الخصوصية</Text>
        </View>

        <Text style={[styles.intro, { color: colors.mutedForeground }]}>
          خصوصيتك مهمة. هاد الصفحة تشرح كيفاش كنتعامل مع معلوماتك.
        </Text>

        {SECTIONS.map((s) => (
          <View
            key={s.title}
            style={[styles.card, { backgroundColor: colors.card, borderRadius: colors.radius, borderRightColor: colors.primary }]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.primary }]}>{s.title}</Text>
              <Feather name={s.icon} size={18} color={colors.primary} />
            </View>
            <Text style={[styles.cardBody, { color: colors.foreground }]}>{s.body}</Text>
          </View>
        ))}

        <Text style={[styles.footer, { color: colors.mutedForeground }]}>
          IDARA.ma © 2026 — دليل مستقل، مجاني، بدون إعلانات مزعجة
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, gap: 16 },
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
  titleRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
  },
  title: { fontSize: 26, fontWeight: "800", textAlign: "right" },
  intro: { fontSize: 13, textAlign: "right", lineHeight: 21 },
  card: {
    padding: 16,
    borderRightWidth: 3,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: { flexDirection: "row-reverse", alignItems: "center", gap: 10 },
  cardTitle: { fontSize: 14, fontWeight: "700", flex: 1, textAlign: "right" },
  cardBody: { fontSize: 13, textAlign: "right", lineHeight: 21 },
  footer: { fontSize: 11, textAlign: "center", marginTop: 8 },
});
