import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ message, role }) {
  const isUser = role === "user";
  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAI]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textAI]}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  rowUser: { alignItems: "flex-end" },
  rowAI: { alignItems: "flex-start" },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: "#5B7FA6",
    borderRadius: 20,
    borderTopRightRadius: 4,
  },
  bubbleAI: {
    backgroundColor: "#EDE9E3",
    borderRadius: 20,
    borderTopLeftRadius: 4,
  },
  text: { fontSize: 16, lineHeight: 22 },
  textUser: { color: "#FFFFFF" },
  textAI: { color: "#2C2C2C" },
});
