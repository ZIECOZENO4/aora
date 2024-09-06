// components/CheckAuth.js
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckAuth = ({ children }) => {
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLogged(true);
        router.replace("/authenticate");
      } else {
        router.replace("/sign-in");
      }
    };

    if (!isLogged) {
      checkAuthStatus();
    }
  }, [isLogged, setUser, setIsLogged, router]);

  if (isLogged && user) {
    return <>{children}</>;
  }

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default CheckAuth;
