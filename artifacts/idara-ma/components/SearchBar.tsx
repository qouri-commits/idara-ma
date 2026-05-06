import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChangeText, onClear }: SearchBarProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderColor: value ? colors.primary : colors.border,
        },
      ]}
    >
      <TouchableOpacity onPress={value ? onClear : undefined} style={styles.icon}>
        <Feather
          name={value ? "x" : "search"}
          size={18}
          color={value ? colors.primary : colors.mutedForeground}
        />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="ابحث عن خدمة..."
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { color: colors.primary }]}
        textAlign="right"
        returnKeyType="search"
      />
      <View style={styles.searchIconRight}>
        <Feather name="search" size={18} color={colors.mutedForeground} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 8,
  },
  icon: {
    padding: 4,
  },
  searchIconRight: {
    padding: 4,
  },
});
