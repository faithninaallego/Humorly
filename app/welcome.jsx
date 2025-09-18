import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Welcome() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#FFF176", "#FBC02D"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/landing")}>
      <Ionicons name="arrow-back" size={26} color="#333" />
      </TouchableOpacity>

      {/* Logo + Title */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")} // 👈 update path if needed
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Humorly!</Text>
        <Text style={styles.subtitle}>Your daily dose of laughs</Text>
      </View>

      {/* Login */}
      <TouchableOpacity onPress={() => router.push("/auth/login")} style={{ width: "60%" }}>
        <LinearGradient colors={["#FFA000", "#F57C00"]} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Sign Up */}
      <TouchableOpacity onPress={() => router.push("/auth/signup")} style={{ width: "60%" }}>
        <LinearGradient colors={["#FBC02D", "#FFA000"]} style={[styles.button, { marginTop: 15 }]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>Or continue with</Text>

      {/* Social Buttons */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialBtn, { borderColor: "#DB4437" }]}>
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={styles.socialBtnText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialBtn, { borderColor: "#1877F2" }]}>
          <Ionicons name="logo-facebook" size={20} color="#1877F2" />
          <Text style={styles.socialBtnText}>Facebook</Text>
        </TouchableOpacity>
      </View>
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
  backText: { marginLeft: 6, fontSize: 16, color: "#333" },
  header: { alignItems: "center", marginBottom: 40 },
  logo: {
    width: 500,
    height: 250,
    marginBottom: 1,
    marginTop: 0,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 4 },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 1.5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  orText: {
    marginTop: 30,
    marginBottom: 12,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  socialButtons: { flexDirection: "row", gap: 12 },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 5,
    backgroundColor: "rgba(255,255,255,0.6)", // glass look
  },
  socialBtnText: { marginLeft: 6, fontSize: 14, fontWeight: "600", color: "#333" },
});
