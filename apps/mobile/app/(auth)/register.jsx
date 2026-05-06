import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirm) return Alert.alert("Please fill in all fields");
    if (password !== confirm) return Alert.alert("Passwords don't match");
    setLoading(true);
    try {
      // TODO: replace with real API call
      await login({ id: "mock", name, email }, "mock-token");
      router.replace("/(app)/chat");
    } catch {
      Alert.alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.inner}>
        <Text style={styles.logo}>nyingje</Text>
        <Text style={styles.heading}>Create your account</Text>

        {[
          { placeholder: "Name", value: name, onChangeText: setName },
          { placeholder: "Email", value: email, onChangeText: setEmail, keyboardType: "email-address", autoCapitalize: "none" },
          { placeholder: "Password", value: password, onChangeText: setPassword, secureTextEntry: true },
          { placeholder: "Confirm password", value: confirm, onChangeText: setConfirm, secureTextEntry: true },
        ].map((props) => (
          <TextInput
            key={props.placeholder}
            style={styles.input}
            placeholderTextColor="#6B7280"
            {...props}
            color="#2C2C2C"
          />
        ))}

        <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Creating…" : "Create account"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Already have an account? <Text style={styles.linkBold}>Sign in</Text></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8" },
  inner: { flex: 1, paddingHorizontal: 28, justifyContent: "center", gap: 12 },
  logo: { fontSize: 32, color: "#6B7280", fontStyle: "italic", marginBottom: 4 },
  heading: { fontSize: 26, fontWeight: "700", color: "#2C2C2C", marginBottom: 4 },
  input: {
    backgroundColor: "#F4F1EB",
    borderWidth: 1,
    borderColor: "#E5E0D8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#5B7FA6",
    borderRadius: 9999,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  link: { textAlign: "center", color: "#6B7280", fontSize: 15, marginTop: 4 },
  linkBold: { color: "#5B7FA6", fontWeight: "600" },
});
