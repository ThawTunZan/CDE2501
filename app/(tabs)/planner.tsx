import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  group?: string;
};

const UPCOMING: Event[] = [
  {
    id: "1",
    title: "Cooking Circle: Simple Recipes",
    date: "Sat, Nov 8",
    time: "10:00–11:30 AM",
    place: "Chinatown CC Kitchen",
    group: "Cooking Buddies",
  },
  {
    id: "2",
    title: "Tai Chi in the Park",
    date: "Sat, Nov 8",
    time: "5:00–6:00 PM",
    place: "Duxton Green",
    group: "Tai Chi Friends",
  },
  {
    id: "3",
    title: "Arts & Crafts: DIY Lanterns",
    date: "Sun, Nov 16",
    time: "2:00–3:30 PM",
    place: "Chinatown CC Hall",
  },
];

export default function PlannerScreen() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [remind, setRemind] = useState<Record<string, boolean>>({});

  const openWhatsApp = (group?: string) => {
    const url = "https://wa.me/0000000000";
    if (!group) return;
    Linking.openURL(url).catch(() =>
      Alert.alert(
        "Cannot open WhatsApp",
        "Please check that WhatsApp is installed."
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Planner</Text>
      <Text style={styles.subtitle}>
        Biweekly meet-ups organised by your CC.
      </Text>

      <View style={styles.list}>
        {UPCOMING.map((ev) => {
          const isJoined = !!joined[ev.id];
          const isRemind = !!remind[ev.id];
          return (
            <View key={ev.id} style={styles.card}>
              <Text style={styles.cardTitle}>{ev.title}</Text>
              <Text style={styles.cardSub}>
                {ev.date} · {ev.time}
              </Text>
              <Text style={styles.cardSub}>{ev.place}</Text>

              {ev.group && (
                <Pressable
                  onPress={() => openWhatsApp(ev.group)}
                  style={styles.whatsappButton}
                >
                  <Text style={styles.whatsappText}>
                    Open WhatsApp group · {ev.group}
                  </Text>
                </Pressable>
              )}

              <View style={styles.cardActions}>
                <Pressable
                  onPress={() =>
                    setJoined((s) => ({ ...s, [ev.id]: !isJoined }))
                  }
                  style={[
                    styles.actionButton,
                    isJoined && styles.actionButtonPrimary,
                  ]}
                >
                  <Text
                    style={[
                      styles.actionText,
                      isJoined && styles.actionTextPrimary,
                    ]}
                  >
                    {isJoined ? "You're joining" : "I'm joining"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    setRemind((s) => ({ ...s, [ev.id]: !isRemind }))
                  }
                  style={[
                    styles.actionButton,
                    isRemind && styles.actionButtonAlt,
                  ]}
                >
                  <Text
                    style={[
                      styles.actionText,
                      isRemind && styles.actionTextAlt,
                    ]}
                  >
                    {isRemind ? "Reminder set" : "Remind me later"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
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
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardSub: { fontSize: 13, color: "#374151", marginTop: 4 },
  whatsappButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  whatsappText: { color: "#065F46" },
  cardActions: { flexDirection: "row", gap: 10, marginTop: 12 },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },
  actionButtonPrimary: { backgroundColor: "#FB7185" },
  actionButtonAlt: { backgroundColor: "#3B82F6" },
  actionText: { fontWeight: "700", color: "#111827" },
  actionTextPrimary: { color: "#fff" },
  actionTextAlt: { color: "#fff" },
});
