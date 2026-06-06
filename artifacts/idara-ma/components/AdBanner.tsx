import React, { useState } from "react";
import { Platform, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { ADMOB_BANNER_ID } from "@/constants/admob";

interface AdBannerProps {
  size?: BannerAdSize;
  topMargin?: number;
  bottomMargin?: number;
}

export function AdBanner({
  size = BannerAdSize.BANNER,
  topMargin = 8,
  bottomMargin = 8,
}: AdBannerProps) {
  const [loaded, setLoaded] = useState(false);

  if (Platform.OS === "web") return null;

  return (
    <View
      style={{
        alignItems: "center",
        marginTop: topMargin,
        marginBottom: bottomMargin,
        minHeight: loaded ? undefined : 0,
        overflow: "hidden",
      }}
    >
      <BannerAd
        unitId={ADMOB_BANNER_ID}
        size={size}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdLoaded={() => setLoaded(true)}
        onAdFailedToLoad={() => setLoaded(false)}
      />
    </View>
  );
}
