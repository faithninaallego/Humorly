import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

// Firebase imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!identifier || !password) {
      setError("⚠️ Please enter your email/username and password.");
      return;
    }

    let email = identifier;

    // If username (no "@"), find email in Firestore
    if (!identifier.includes("@")) {
      try {
        const q = query(collection(db, "users"), where("username", "==", identifier));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          email = snapshot.docs[0].data().email;
        } else {
          setError("❌ Username not found");
          return;
        }
      } catch (err) {
        setError("Error checking username: " + err.message);
        return;
      }
    }

    // Try logging in
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("✅ Login successful!");
      setTimeout(() => router.replace("/jokes"), 1000);
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    }
  };

  return (
    <LinearGradient colors={["#FFF176", "#FBC02D"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/landing")}>
        <Ionicons name="arrow-back" size={26} color="#333" />
      </TouchableOpacity>

      {/* Animated Logo */}
      <Animated.Image
        entering={FadeInDown.springify().damping(10).stiffness(90)}
        source={require("../../assets/logo.png")} // 👈 update path if needed
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Welcome Back</Text>

      {/* Error/Success messages */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="#666"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={{ width: "80%" }} onPress={handleLogin}>
        <LinearGradient colors={["#FFA000", "#F57C00"]} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Footer Link */}
      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  backBtn: {
    position: "absolute",
    top: 70,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { width: 110, height: 110, marginBottom: 15 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15, color: "#333" },
  input: {
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  link: {
    marginTop: 18,
    fontSize: 14,
    color: "#F57C00",
    fontWeight: "600",
  },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
  success: { color: "green", marginBottom: 10, textAlign: "center" },
});
