import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#FFF176", "#FBC02D"]} style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Big Call-to-Action Button */}
      <TouchableOpacity onPress={() => router.push("/welcome")} style={{ width: "80%" }}>
        <LinearGradient colors={["#FBC02D", "#FFA000"]} style={styles.button}>
          <Text style={styles.buttonText}>Let’s Laugh!</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 500, height: 450, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 40 },
  button: {
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
