import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";

const RECOMMENDED = [
  {
    id: "r1",
    title: "Calligraphy Workshop (Beginner)",
    date: "Tue, Nov 11",
    place: "Kreta Ayer CC",
    tag: "Arts & Crafts",
  },
  {
    id: "r2",
    title: "Morning Walk & Tea",
    date: "Wed, Nov 12",
    place: "Ann Siang Hill",
    tag: "Walking",
  },
  {
    id: "r3",
    title: "Community Movie Afternoon",
    date: "Fri, Nov 14",
    place: "Chinatown CC Hall",
    tag: "Movies",
  },
];

export default function RecommendationsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recommended for you</Text>
      <Text style={styles.subtitle}>
        Suggested activities based on your interests.
      </Text>

      <View style={styles.list}>
        {RECOMMENDED.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            </View>
            <Text style={styles.cardSub}>
              {item.date} · {item.place}
            </Text>
            <View style={styles.cardActions}>
              <Pressable style={styles.primaryAction}>
                <Text style={styles.primaryActionText}>View details</Text>
              </Pressable>
              <Pressable style={styles.secondaryAction}>
                <Text style={styles.secondaryActionText}>Remind me</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", minHeight: "100%" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 6, color: "#111827" },
  subtitle: { fontSize: 16, color: "#374151", marginBottom: 14 },
  list: { gap: 12 },
  card: {
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#FCE7F3",
  },
  tagText: { color: "#831843", fontSize: 12 },
  cardSub: { fontSize: 13, color: "#374151", marginTop: 6 },
  cardActions: { flexDirection: "row", gap: 8, marginTop: 12 },
  primaryAction: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FB7185",
  },
  primaryActionText: { color: "#fff", fontWeight: "700" },
  secondaryAction: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },
  secondaryActionText: { color: "#111827", fontWeight: "700" },
});
