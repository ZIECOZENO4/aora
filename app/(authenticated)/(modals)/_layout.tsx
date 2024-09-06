import { Redirect, Stack } from "expo-router";
import { ClerkProvider, useAuth, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "../../../lib/auth";
const Layout = () => {
  const { isSignedIn } = useAuth();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  if (isSignedIn) {
    return <Redirect href={"/(authenticated)/tabs"} />;
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="account" options={{ headerShown: false }} />
          <Stack.Screen name="lock" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Layout;
