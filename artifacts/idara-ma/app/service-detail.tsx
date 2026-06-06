import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useBookmarks } from "@/contexts/BookmarksContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { DEVELOPER_WHATSAPP } from "@/constants/config";
import { categories } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function ServiceDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { addRecent } = useRecentlyViewed();
  const { categoryId, serviceId } = useLocalSearchParams<{
    categoryId: string;
    serviceId: string;
  }>();

  const category = categories.find((c) => c.id === categoryId);
  const service = category?.services.find((s) => s.id === serviceId);
  const bookmarkKey = { categoryId: categoryId ?? "", serviceId: serviceId ?? "" };
  const starred = isBookmarked(bookmarkKey);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (categoryId && serviceId) {
      addRecent({ categoryId, serviceId });
    }
  }, [categoryId, serviceId]);

  if (!category || !service) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>
          الخدمة غير موجودة
        </Text>
      </View>
    );
  }

  const docItems = service.docs
    .split(/\s*\+\s*/)
    .map((d) => d.trim())
    .filter(Boolean);

  const handleOpenSite = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await WebBrowser.openBrowserAsync(service.link);
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const text = `لقيت هاد الخدمة فـ IDARA.ma:\n${service.name}\n\nالرابط الرسمي: ${service.link}\n\n🇲🇦 ساهل و بالدارجة`;
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `whatsapp://send?text=${encoded}`;
    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        await Share.share({ message: text });
      }
    } catch {
      await Share.share({ message: text });
    }
  };

  const handleReport = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const text = `السلام، الرابط ديال "${service.name}" خاسر أو ما خدامش:\n${service.link}\n\nشكرا IDARA.ma`;
    const waUrl = `whatsapp://send?phone=${DEVELOPER_WHATSAPP}&text=${encodeURIComponent(text)}`;
    const canWA = await Linking.canOpenURL(waUrl);
    if (canWA) {
      await Linking.openURL(waUrl);
    } else {
      await Share.share({ message: text });
    }
  };

  const handleCopy = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Clipboard.setStringAsync(service.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleStar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleBookmark(bookmarkKey);
  };

  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom + 24;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPadding, paddingBottom: bottomPadding + 90 },
        ]}
      >
        {/* ─── Top Bar ─── */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={handleToggleStar}
            hitSlop={12}
            style={[
              styles.starButton,
              {
                backgroundColor: starred ? "#FFF8D6" : colors.card,
                borderRadius: colors.radius - 4,
                borderColor: starred ? colors.accent : colors.border,
              },
            ]}
          >
            <Feather
              name="star"
              size={20}
              color={starred ? colors.accent : colors.mutedForeground}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: colors.card, borderRadius: colors.radius - 4 },
            ]}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-right" size={18} color={colors.primary} />
            <Text style={[styles.backText, { color: colors.primary }]}>رجوع</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Breadcrumb ─── */}
        <TouchableOpacity
          style={styles.breadcrumb}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name={category.icon as any} size={13} color={colors.mutedForeground} />
          <Text style={[styles.breadcrumbText, { color: colors.mutedForeground }]}>
            {category.title}
          </Text>
          <Feather name="chevron-left" size={12} color={colors.border} />
        </TouchableOpacity>

        {/* ─── Service Title ─── */}
        <Text style={[styles.serviceTitle, { color: colors.primary }]}>
          {service.name}
        </Text>

        {/* ─── Source badge ─── */}
        <View style={styles.sourceBadgeRow}>
          <View style={[styles.sourceBadge, { backgroundColor: colors.secondary, borderRadius: 20 }]}>
            <Feather name="globe" size={12} color={colors.primary} />
            <Text style={[styles.sourceBadgeText, { color: colors.primary }]}>
              {service.source}
            </Text>
          </View>
        </View>

        {/* ─── Warning ─── */}
        {service.warning && (
          <View
            style={[
              styles.warningBox,
              {
                backgroundColor: colors.warning,
                borderRightColor: colors.warningBorder,
                borderRadius: colors.radius,
              },
            ]}
          >
            <View style={styles.warningHeader}>
              <Text style={[styles.warningLabel, { color: colors.warningText }]}>
                تنبيه مهم
              </Text>
              <Feather name="alert-triangle" size={16} color={colors.warningBorder} />
            </View>
            <Text style={[styles.warningText, { color: colors.warningText }]}>
              {service.warning}
            </Text>
          </View>
        )}

        {/* ─── Required Documents ─── */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              borderRadius: colors.radius,
              borderRightColor: colors.primary,
            },
          ]}
        >
          <View style={styles.infoHeader}>
            <Text style={[styles.infoLabel, { color: colors.primary }]}>
              الوثائق المطلوبة
            </Text>
            <Feather name="file-text" size={18} color={colors.primary} />
          </View>

          {docItems.length > 1 ? (
            <View style={styles.docList}>
              {docItems.map((doc, idx) => (
                <View key={idx} style={styles.docItem}>
                  <Text style={[styles.docText, { color: colors.foreground }]}>
                    {doc}
                  </Text>
                  <View style={[styles.docDot, { backgroundColor: colors.accent }]} />
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.infoValue, { color: colors.foreground }]}>
              {service.docs}
            </Text>
          )}
        </View>

        {/* ─── Official Link ─── */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              borderRadius: colors.radius,
              borderRightColor: colors.secondary,
            },
          ]}
        >
          <View style={styles.infoHeader}>
            <Text style={[styles.infoLabel, { color: colors.primary }]}>
              الرابط الرسمي
            </Text>
            <Feather name="link" size={18} color={colors.primary} />
          </View>
          <View style={styles.linkRow}>
            <TouchableOpacity
              onPress={handleCopy}
              hitSlop={10}
              style={[
                styles.copyBtn,
                {
                  backgroundColor: copied ? "#dcfce7" : colors.secondary,
                  borderRadius: colors.radius - 6,
                  borderColor: copied ? "#86efac" : colors.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Feather
                name={copied ? "check" : "copy"}
                size={14}
                color={copied ? "#16a34a" : colors.mutedForeground}
              />
              <Text
                style={[
                  styles.copyText,
                  { color: copied ? "#16a34a" : colors.mutedForeground },
                ]}
              >
                {copied ? "تم النسخ ✓" : "نسخ الرابط"}
              </Text>
            </TouchableOpacity>
            <Text
              style={[styles.linkUrl, { color: colors.accent }]}
              numberOfLines={1}
            >
              {service.source}
            </Text>
          </View>
        </View>

        {/* ─── Report ─── */}
        <TouchableOpacity
          onPress={handleReport}
          activeOpacity={0.7}
          style={[
            styles.reportBtn,
            { borderColor: colors.border, borderRadius: colors.radius - 4 },
          ]}
        >
          <Feather name="alert-circle" size={14} color="#b45309" />
          <Text style={styles.reportText}>الرابط خاسر؟ بلغ عليه</Text>
        </TouchableOpacity>

        {/* ─── Disclaimer ─── */}
        <View style={[styles.disclaimer, { borderTopColor: colors.border }]}>
          <Feather name="info" size={13} color={colors.mutedForeground} />
          <Text style={[styles.disclaimerText, { color: colors.mutedForeground }]}>
            IDARA.ma كيجمع الروابط الرسمية فقط. ما نمثلوش أي جهة حكومية.
          </Text>
        </View>
      </ScrollView>

      {/* ─── CTA Buttons ─── */}
      <View
        style={[
          styles.ctaContainer,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 16,
          },
        ]}
      >
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={[styles.shareButton, { borderRadius: colors.radius }]}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Feather name="message-circle" size={18} color="#fff" />
            <Text style={styles.shareText}>صيفط لصاحبك</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.ctaButton,
              { backgroundColor: colors.primary, borderRadius: colors.radius },
            ]}
            onPress={handleOpenSite}
            activeOpacity={0.85}
          >
            <Feather name="external-link" size={18} color="#fff" />
            <Text style={styles.ctaText}>افتح الموقع الرسمي</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingHorizontal: 16,
    gap: 14,
  },
  errorText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  backText: { fontSize: 14, fontWeight: "600" },
  starButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },

  breadcrumb: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-end",
  },
  breadcrumbText: { fontSize: 12 },

  serviceTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "right",
    lineHeight: 32,
  },

  sourceBadgeRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -4,
  },
  sourceBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sourceBadgeText: { fontSize: 11, fontWeight: "700" },

  warningBox: {
    padding: 14,
    borderRightWidth: 4,
    gap: 8,
  },
  warningHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  warningLabel: { fontSize: 14, fontWeight: "700", textAlign: "right" },
  warningText: { fontSize: 13, textAlign: "right", lineHeight: 20 },

  infoCard: {
    padding: 16,
    borderRightWidth: 4,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  infoHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  infoLabel: { fontSize: 13, fontWeight: "700", textAlign: "right" },
  infoValue: { fontSize: 14, textAlign: "right", lineHeight: 22 },

  docList: { gap: 8 },
  docItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  docDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    flexShrink: 0,
  },
  docText: {
    flex: 1,
    fontSize: 14,
    textAlign: "right",
    lineHeight: 22,
  },

  linkRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  linkUrl: {
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
  },
  copyText: { fontSize: 12, fontWeight: "600" },

  reportBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  reportText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#b45309",
    textAlign: "center",
  },

  disclaimer: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 8,
    borderTopWidth: 1,
    paddingTop: 14,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    textAlign: "right",
    lineHeight: 17,
  },

  ctaContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  ctaRow: {
    flexDirection: "row-reverse",
    gap: 10,
  },
  shareButton: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 8,
    backgroundColor: "#25D366",
  },
  shareText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  ctaButton: {
    flex: 1.6,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 8,
  },
  ctaText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
