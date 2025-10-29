import { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111827",
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  headerEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#475569",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitle: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 14,
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  clearText: {
    color: "#6B7280",
    fontSize: 13,
  },
  countWrap: {
    marginBottom: 8,
  },
  selectedCount: {
    color: "#374151",
    fontSize: 13,
    marginBottom: 6,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 4,
  },
  chipActive: {
    backgroundColor: "#FDE2E6",
    borderColor: "#FB7185",
  },
  chipText: {
    fontSize: 14,
    color: "#111827",
  },
  chipTextActive: {
    color: "#7F1D1D",
  },
  chipPressed: {
    opacity: 0.75,
  },
  actions: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#FB7185",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 6,
  },
  secondaryButtonText: {
    color: "#111827",
  },
  smallText: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 6,
  },
});

export default function InterestsScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const INTERESTS = [
    "Cooking",
    "Gardening",
    "Mahjong",
    "Tai Chi",
    "Singing",
    "Calligraphy",
    "Walking",
    "Tea Sessions",
    "Movies",
    "Arts & Crafts",
  ];

  const toggle = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.headerEmoji}>💬</Text>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Connect with neighbours</Text>
          <Text style={styles.headerSubtitle}>
            Pick hobbies to join small groups.
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Your interests</Text>
      <View style={styles.rowBetween}>
        <Text style={styles.subtitle}>Choose a few you like.</Text>
        <Pressable onPress={() => setSelected([])} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </View>

      <View style={styles.countWrap}>
        <Text style={styles.selectedCount}>{selected.length} selected</Text>
      </View>

      <View style={styles.chipsContainer}>
        {INTERESTS.map((label) => {
          const active = selected.includes(label);
          return (
            <Pressable
              key={label}
              onPress={() => toggle(label)}
              style={({ pressed }) => [
                styles.chip,
                active && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.actions}>
        <Pressable accessibilityRole="button" style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Save interests</Text>
        </Pressable>

        <Pressable accessibilityRole="button" style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>🎙️ Use voice </Text>
        </Pressable>

        <Text style={styles.smallText}>
          Multilingual support available at CC counters.
        </Text>
      </View>
    </ScrollView>
  );
}
