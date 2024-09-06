// import { Redirect, Stack } from "expo-router";
// import { ClerkProvider, useAuth, ClerkLoaded } from "@clerk/clerk-expo";
// import { tokenCache } from "../../lib/auth";

// const AuthenticatedLayout = () => {
//   const { isSignedIn } = useAuth();

//   if (isSignedIn) {
//     return <Redirect href={"/(authenticated)/tabs"} />;
//   }

//   return (
//     <Stack>
//       <Stack.Screen name="welcome" options={{ headerShown: false }} />
//       <Stack.Screen name="sign-up" options={{ headerShown: false }} />
//       <Stack.Screen name="sign-in" options={{ headerShown: false }} />
//     </Stack>
//   );
// };

// const Layout = () => {
//   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) {
//     throw new Error(
//       "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
//     );
//   }

//   return (
//     <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//       <ClerkLoaded>
//         <AuthenticatedLayout />
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// };

// export default Layout;

import { Redirect, Stack } from "expo-router";
import { ClerkProvider, useAuth, ClerkLoaded } from "@clerk/clerk-expo";

const AuthenticatedLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(authenticated)/tabs"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthenticatedLayout;
