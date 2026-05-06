import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return Alert.alert("Please fill in all fields");
    setLoading(true);
    try {
      // TODO: replace with real API call
      await login({ id: "mock", name: "Tenzin", email }, "mock-token");
      router.replace("/(app)/chat");
    } catch {
      Alert.alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.inner}>
        <Text style={styles.logo}>nyingje</Text>
        <Text style={styles.heading}>Welcome back</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Signing in…" : "Sign in"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.link}>Don't have an account? <Text style={styles.linkBold}>Register</Text></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8" },
  inner: { flex: 1, paddingHorizontal: 28, justifyContent: "center", gap: 14 },
  logo: { fontSize: 32, color: "#6B7280", fontStyle: "italic", marginBottom: 8 },
  heading: { fontSize: 26, fontWeight: "700", color: "#2C2C2C", marginBottom: 8 },
  input: {
    backgroundColor: "#F4F1EB",
    borderWidth: 1,
    borderColor: "#E5E0D8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#2C2C2C",
  },
  btn: {
    backgroundColor: "#5B7FA6",
    borderRadius: 9999,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  link: { textAlign: "center", color: "#6B7280", fontSize: 15, marginTop: 8 },
  linkBold: { color: "#5B7FA6", fontWeight: "600" },
});
