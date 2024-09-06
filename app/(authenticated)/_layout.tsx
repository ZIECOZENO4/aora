import { Stack, useRouter, useSegments } from "expo-router";
import {
  LogBox,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Animated,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useState, useCallback, useEffect } from "react";
import Colors from "../../constants/Colors";
import { Redirect } from "expo-router";
import { ClerkProvider, useAuth, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "../../lib/auth";

const AuthenticatedLayout: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [scrollY] = useState<Animated.Value>(new Animated.Value(0));
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Perform the refresh logic here
    const currentRoute = segments.join("/");
    router.replace(currentRoute as any);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [router, segments]);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 60],
    extrapolate: "clamp",
  });

  useEffect(() => {
    console.warn("Current route:", segments.join("/"));
  }, [segments]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={"/(authenticated)/tabs"} />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
          title="Pull to refresh"
          titleColor={Colors.primary}
          colors={[Colors.primary]}
          progressBackgroundColor={Colors.background}
        />
      }
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
    >
      <Stack initialRouteName="home">
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="account" options={{ headerShown: false }} />
        <Stack.Screen name="lock" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="crypto" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen name="invest" options={{ headerShown: false }} />
        <Stack.Screen name="lifestyle" options={{ headerShown: false }} />
        <Stack.Screen name="transfer" options={{ headerShown: false }} />
      </Stack>
    </ScrollView>
  );
};

const Layout: React.FC = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <AuthenticatedLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Layout;
