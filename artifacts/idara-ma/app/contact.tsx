import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const DEVELOPER_WA = "+212600000000";
const CONTACT_EMAIL = "idara.ma.contact@gmail.com";

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;

  const handleWhatsApp = async () => {
    const text = encodeURIComponent("السلام، كنكتبك من تطبيق IDARA.ma...");
    const url = `whatsapp://send?phone=${DEVELOPER_WA}&text=${text}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert("واتساب ما تلقاش", "خاصك تركب واتساب أولا");
    }
  };

  const handleEmail = () => {
    if (!name.trim() || !message.trim()) {
      Alert.alert("خاصك تملا", "الإسم والرسالة ضروريين");
      return;
    }
    const subject = encodeURIComponent(`IDARA.ma - رسالة من ${name}`);
    const body = encodeURIComponent(
      `الإسم: ${name}\n\nالرسالة:\n${message}\n\n— أُرسل من تطبيق IDARA.ma`
    );
    Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`);
  };

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
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          style={[styles.back, { backgroundColor: colors.card, borderRadius: colors.radius - 4 }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-right" size={18} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>رجوع</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.titleRow}>
          <Feather name="mail" size={28} color={colors.primary} />
          <Text style={[styles.title, { color: colors.primary }]}>تواصل معنا</Text>
        </View>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          عندك ملاحظة، رابط خاسر، أو حتى شي اقتراح؟ كتبلنا!
        </Text>

        {/* Email info */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: colors.radius, borderRightColor: colors.primary }]}>
          <View style={styles.cardRow}>
            <Text style={[styles.cardLabel, { color: colors.mutedForeground }]}>{CONTACT_EMAIL}</Text>
            <Feather name="mail" size={18} color={colors.primary} />
          </View>
        </View>

        {/* WhatsApp */}
        <TouchableOpacity
          style={[styles.waBtn, { borderRadius: colors.radius }]}
          onPress={handleWhatsApp}
          activeOpacity={0.85}
        >
          <Feather name="message-circle" size={20} color="#fff" />
          <Text style={styles.waBtnText}>تواصل عبر واتساب</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={[styles.divider, { borderColor: colors.border }]}>
          <Text style={[styles.dividerText, { color: colors.mutedForeground }]}>أو ارسل رسالة مباشرة</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={[styles.inputWrap, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius - 4 }]}>
            <TextInput
              style={[styles.input, { color: colors.foreground }]}
              placeholder="اسمك"
              placeholderTextColor={colors.mutedForeground}
              value={name}
              onChangeText={setName}
              textAlign="right"
              autoCapitalize="none"
            />
          </View>
          <View style={[styles.inputWrap, styles.messageWrap, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius - 4 }]}>
            <TextInput
              style={[styles.input, styles.messageInput, { color: colors.foreground }]}
              placeholder="رسالتك..."
              placeholderTextColor={colors.mutedForeground}
              value={message}
              onChangeText={setMessage}
              textAlign="right"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: colors.primary, borderRadius: colors.radius }]}
            onPress={handleEmail}
            activeOpacity={0.85}
          >
            <Feather name="send" size={18} color="#fff" />
            <Text style={styles.sendText}>إرسال عبر الإيميل</Text>
          </TouchableOpacity>
        </View>
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
  sub: { fontSize: 13, textAlign: "right", lineHeight: 20 },
  card: {
    padding: 14,
    borderRightWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardRow: { flexDirection: "row-reverse", alignItems: "center", gap: 10 },
  cardLabel: { fontSize: 13, flex: 1, textAlign: "right" },
  waBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#25D366",
    paddingVertical: 14,
  },
  waBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  divider: {
    borderTopWidth: 1,
    paddingTop: 16,
    alignItems: "center",
  },
  dividerText: { fontSize: 12, fontWeight: "600" },
  form: { gap: 12 },
  inputWrap: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  messageWrap: { paddingVertical: 8 },
  input: { fontSize: 14, paddingVertical: 10 },
  messageInput: { minHeight: 100 },
  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
  },
  sendText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
