import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function OnboardingSlide({ title, subtitle, decoration }) {
  return (
    <View style={styles.slide}>
      <View style={styles.decoration}>
        <Text style={styles.decorationText}>{decoration}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: "#FDFCF8",
  },
  decoration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#C9965A22",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  decorationText: {
    fontSize: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C2C2C",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 17,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 26,
  },
});
