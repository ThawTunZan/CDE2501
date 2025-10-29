import { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";

type Mood = "happy" | "neutral" | "sad";

const MOODS: { key: Mood; emoji: string; label: string }[] = [
  { key: "happy", emoji: "😊", label: "Happy" },
  { key: "neutral", emoji: "😐", label: "Neutral" },
  { key: "sad", emoji: "😢", label: "Sad" },
];

export default function MoodScreen() {
  // Store moods for the week, with today as the first day (index 0)
  const [history, setHistory] = useState<Mood[]>([]);
  const [today, setToday] = useState<Mood | null>(null);

  // Allow changing today's mood, only one per day
  const choose = (m: Mood) => {
    setToday(m);
    setHistory((h) => {
      const newHistory = [...h];
      newHistory[0] = m;
      return newHistory.length > 0 ? newHistory.slice(0, 7) : [m];
    });
  };

  // Reset today's mood selection
  const resetToday = () => {
    setToday(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={resetToday}>
        <Text style={styles.title}>Daily mood check-in</Text>
      </Pressable>
      <Text style={styles.subtitle}>
        Good morning! How are you feeling today?
      </Text>

      <View style={styles.moodRow}>
        {MOODS.map((m) => {
          const isActive = today === m.key;
          return (
            <Pressable
              key={m.key}
              onPress={() => choose(m.key)}
              style={[
                styles.moodButton,
                isActive && styles.moodButtonActive,
                isActive && {
                  borderWidth: 2,
                  borderColor: "#FB7185",
                  shadowColor: "#FB7185",
                  shadowOpacity: 0.18,
                },
              ]}
            >
              <Text style={[styles.moodEmoji, isActive && { fontSize: 36 }]}>
                {m.emoji}
              </Text>
              <Text
                style={[
                  styles.moodLabel,
                  isActive && { color: "#FB7185", fontWeight: "700" },
                ]}
              >
                {m.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Week view UI (no logic) */}
      <View style={{ marginBottom: 18, marginTop: 8 }}>
        <Text
          style={{
            fontWeight: "700",
            color: "#374151",
            marginBottom: 8,
            fontSize: 16,
          }}
        >
          Your mood for the week
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {[...Array(7)].map((_, i) => (
            <View key={i} style={{ alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F3F4F6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 4,
                }}
              >
                {/* Show mood emoji for each day (UI only, placeholder) */}
                <Text style={{ fontSize: 22 }}>
                  {history[i]
                    ? MOODS.find((x) => x.key === history[i])?.emoji
                    : "–"}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ marginBottom: 18, marginTop: 8, alignItems: "center" }}>
        {today && (
          <View
            style={{
              backgroundColor: "#FDECEF",
              borderRadius: 16,
              padding: 12,
              alignItems: "center",
              shadowColor: "#FB7185",
              shadowOpacity: 0.12,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 22, color: "#FB7185", fontWeight: "700" }}>
              You feel {MOODS.find((x) => x.key === today)?.label.toLowerCase()}{" "}
              today
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.footerNote}>
        Your mood is private. If you often feel sad, a CC staff may gently check
        in.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", minHeight: "100%" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111827",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  subtitle: { fontSize: 16, color: "#374151", marginBottom: 16 },
  moodRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  moodButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  moodButtonActive: { backgroundColor: "#FDECEF" },
  moodEmoji: { fontSize: 28, textAlign: "center" },
  moodLabel: { marginTop: 6, textAlign: "center", color: "#111827" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  noEntries: { color: "#6B7280" },
  historyRow: { flexDirection: "row", gap: 8 },
  historyItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 4,
  },
  historyEmoji: { fontSize: 20 },
  footerNote: { color: "#6B7280", fontSize: 12, marginTop: 18 },
});
