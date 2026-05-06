import { useState, useRef } from "react";
import {
  View, Text, FlatList, KeyboardAvoidingView,
  Platform, StyleSheet, TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ChatBubble from "../../components/ChatBubble";
import ChatInput from "../../components/ChatInput";
import { useAuth } from "../../hooks/useAuth";
import api from "../../lib/api";

const MOCK_MESSAGES = [
  { id: "1", role: "assistant", content: "Hello. I'm glad you're here. How are you feeling today?" },
  { id: "2", role: "user", content: "I've been really anxious lately..." },
  { id: "3", role: "assistant", content: "I hear you. Anxiety can feel overwhelming. Would you like to tell me more about what's been happening?" },
];

export default function Chat() {
  const router = useRouter();
  const { logout } = useAuth();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const flatRef = useRef(null);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const userMsg = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    setSending(true);
    try {
      const res = await api.post("/chat", { message: text, conversationId });
      setConversationId(res.data.conversationId);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.data.reply,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I had trouble connecting. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setSending(false);
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nyingje</Text>
        <Text style={styles.headerSub}>Here to listen</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={async () => { await logout(); router.replace("/onboarding"); }}>
          <Text style={styles.logoutText}>Exit</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => <ChatBubble message={item.content} role={item.role} />}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: false })}
        />
        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          disabled={sending}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8" },
  header: {
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E0D8",
    position: "relative",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#2C2C2C" },
  headerSub: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  logoutBtn: { position: "absolute", right: 16, top: 14 },
  logoutText: { color: "#6B7280", fontSize: 14 },
  list: { paddingVertical: 16, gap: 2 },
});
