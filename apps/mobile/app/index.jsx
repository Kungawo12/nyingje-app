import { Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FDFCF8" }}>
        <ActivityIndicator color="#5B7FA6" />
      </View>
    );
  }

  return user ? <Redirect href="/(app)/chat" /> : <Redirect href="/onboarding" />;
}
