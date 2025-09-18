import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateJoke() {
  const router = useRouter();
  const [joke, setJoke] = useState("");

  const handleAdd = async () => {
    if (!joke.trim()) return;
    await addDoc(collection(db, "jokes"), {
      text: joke,
      userId: auth.currentUser?.uid || "guest",
      createdAt: serverTimestamp(),
    });
    setJoke("");
    router.back(); // 👈 go back to jokes feed
  };

  return (
    <LinearGradient colors={["#FFF176", "#FBC02D"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Create a Joke 🤩</Text>

      <TextInput
        style={styles.input}
        placeholder="Write your funniest joke..."
        placeholderTextColor="#888"
        value={joke}
        onChangeText={setJoke}
        multiline
      />

      <TouchableOpacity onPress={handleAdd} style={{ width: "80%" }}>
        <LinearGradient colors={["#FFA000", "#F57C00"]} style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  backBtn: { position: "absolute", top: 60, left: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    textAlignVertical: "top",
  },
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
});
