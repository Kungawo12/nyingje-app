import { useRef, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import OnboardingSlide from "../components/OnboardingSlide";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    key: "1",
    title: "Welcome to Nyingje",
    subtitle: "A compassionate space for your hardest moments.",
    decoration: "✿",
  },
  {
    key: "2",
    title: "Rooted in wisdom",
    subtitle: "Drawing on Buddhist contemplative tradition and modern psychology.",
    decoration: "📿",
  },
  {
    key: "3",
    title: "Private & safe",
    subtitle: "Your conversations are encrypted. Only you can see them.",
    decoration: "🔒",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const flatRef = useRef(null);
  const [index, setIndex] = useState(0);

  function goNext() {
    if (index < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    } else {
      router.replace("/(auth)/login");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skip} onPress={() => router.replace("/(auth)/login")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <OnboardingSlide title={item.title} subtitle={item.subtitle} decoration={item.decoration} />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={goNext}>
          <Text style={styles.btnText}>{index === SLIDES.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8" },
  skip: { alignSelf: "flex-end", padding: 16 },
  skipText: { color: "#6B7280", fontSize: 15 },
  footer: { paddingHorizontal: 32, paddingBottom: 32, alignItems: "center", gap: 24 },
  dots: { flexDirection: "row", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#E5E0D8" },
  dotActive: { backgroundColor: "#5B7FA6", width: 24 },
  btn: {
    backgroundColor: "#5B7FA6",
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 9999,
    width: "100%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "600" },
});
