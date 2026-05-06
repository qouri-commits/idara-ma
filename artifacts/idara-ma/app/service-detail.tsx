import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
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

  const toggle = toggleBookmark;

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

  const handleOpenSite = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await WebBrowser.openBrowserAsync(service.link);
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const text = `لقيت هاد الخدمة فـ IDARA.ma - ${service.name}. الرابط الرسمي: ${service.link}. ساهل و بالدارجة 🇲🇦`;
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

  const handleToggleStar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggle(bookmarkKey);
  };

  const topPadding = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom + 24;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPadding, paddingBottom: bottomPadding + 80 },
        ]}
      >
        {/* Top row: back + star */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={handleToggleStar}
            hitSlop={12}
            style={[
              styles.starButton,
              {
                backgroundColor: starred ? "#fef3c7" : colors.card,
                borderRadius: colors.radius - 4,
                borderColor: starred ? "#f59e0b" : colors.border,
              },
            ]}
          >
            <Feather
              name="star"
              size={20}
              color={starred ? "#f59e0b" : colors.mutedForeground}
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

        {/* Category breadcrumb */}
        <View style={styles.breadcrumb}>
          <Feather name={category.icon as any} size={14} color={colors.mutedForeground} />
          <Text style={[styles.breadcrumbText, { color: colors.mutedForeground }]}>
            {category.title}
          </Text>
        </View>

        {/* Service Title */}
        <Text style={[styles.serviceTitle, { color: colors.primary }]}>
          {service.name}
        </Text>

        {/* Warning */}
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

        {/* Required Documents */}
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
          <Text style={[styles.infoValue, { color: colors.foreground }]}>
            {service.docs}
          </Text>
        </View>

        {/* Source */}
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
              الموقع الرسمي
            </Text>
            <Feather name="globe" size={18} color={colors.primary} />
          </View>
          <Text style={[styles.sourceValue, { color: colors.accent }]}>
            {service.source}
          </Text>
        </View>

        {/* Disclaimer */}
        <View style={[styles.disclaimer, { borderTopColor: colors.border }]}>
          <Feather name="info" size={13} color={colors.mutedForeground} />
          <Text style={[styles.disclaimerText, { color: colors.mutedForeground }]}>
            IDARA.ma كيجمع الروابط الرسمية فقط. ما نمثلوش أي جهة حكومية.
          </Text>
        </View>
      </ScrollView>

      {/* CTA Buttons */}
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
          {/* WhatsApp Share Button */}
          <TouchableOpacity
            style={[styles.shareButton, { borderRadius: colors.radius }]}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Feather name="message-circle" size={20} color="#fff" />
            <Text style={styles.shareText}>صيفط لصاحبك</Text>
          </TouchableOpacity>

          {/* Official Site Button */}
          <TouchableOpacity
            style={[
              styles.ctaButton,
              { backgroundColor: colors.primary, borderRadius: colors.radius },
            ]}
            onPress={handleOpenSite}
            activeOpacity={0.85}
          >
            <Feather name="external-link" size={18} color="#fff" />
            <Text style={styles.ctaText}>الموقع الرسمي</Text>
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
    gap: 16,
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
    paddingVertical: 8,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
  },
  starButton: {
    width: 40,
    height: 40,
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
    gap: 6,
    alignSelf: "flex-end",
  },
  breadcrumbText: {
    fontSize: 12,
    textAlign: "right",
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "right",
    lineHeight: 32,
  },
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
  warningLabel: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
  },
  warningText: {
    fontSize: 13,
    textAlign: "right",
    lineHeight: 20,
  },
  infoCard: {
    padding: 16,
    borderRightWidth: 4,
    gap: 10,
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
  infoLabel: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
  },
  infoValue: {
    fontSize: 14,
    textAlign: "right",
    lineHeight: 22,
  },
  sourceValue: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "600",
  },
  disclaimer: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 8,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    textAlign: "right",
    lineHeight: 17,
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
  shareText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
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
  ctaButton: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 10,
  },
  ctaText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
