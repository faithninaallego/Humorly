import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function JokesFeed() {
  const router = useRouter();
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      const q = query(collection(db, "jokes"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setJokes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchJokes();
  }, []);

  return (
    <LinearGradient colors={["#FFF176", "#FBC02D"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hi 👋</Text>
        <Text style={styles.subtitle}>Ready for some laughs?</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={{ width: "90%" }}
        onPress={() => router.push("/jokes/create")}
      >
        <LinearGradient colors={["#FFA000", "#F57C00"]} style={styles.button}>
          <Text style={styles.buttonText}>Create a Joke</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Joke List */}
      <FlatList
        data={jokes}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20, width: "90%" }}
        renderItem={({ item }) => (
          <View style={styles.jokeCard}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#F57C00" />
            <Text style={styles.jokeText}>{item.text}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 60 },
  header: { marginBottom: 30, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 5 },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  jokeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  jokeText: { marginLeft: 10, fontSize: 16, color: "#333" },
});
