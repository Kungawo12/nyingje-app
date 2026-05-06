import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ChatInput({ value, onChangeText, onSend, disabled }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Say something..."
        placeholderTextColor="#6B7280"
        multiline
        maxLength={1000}
      />
      <TouchableOpacity
        style={[styles.sendBtn, (disabled || !value.trim()) && styles.sendBtnDisabled]}
        onPress={onSend}
        disabled={disabled || !value.trim()}
      >
        <Text style={styles.sendIcon}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E0D8",
    backgroundColor: "#FDFCF8",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#F4F1EB",
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: "#2C2C2C",
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#E5E0D8",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#5B7FA6",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: { backgroundColor: "#E5E0D8" },
  sendIcon: { color: "#fff", fontSize: 20, fontWeight: "600" },
});
