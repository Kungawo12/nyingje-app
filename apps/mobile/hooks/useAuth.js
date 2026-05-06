import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.multiGet(["user", "token"]).then(([userPair, tokenPair]) => {
      if (userPair[1]) setUser(JSON.parse(userPair[1]));
      if (tokenPair[1]) setToken(tokenPair[1]);
      setLoading(false);
    });
  }, []);

  async function login(userData, authToken) {
    await AsyncStorage.multiSet([
      ["user", JSON.stringify(userData)],
      ["token", authToken],
    ]);
    setUser(userData);
    setToken(authToken);
  }

  async function logout() {
    await AsyncStorage.multiRemove(["user", "token"]);
    setUser(null);
    setToken(null);
  }

  return { user, token, loading, login, logout };
}
