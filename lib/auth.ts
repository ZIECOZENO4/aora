import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

import { fetchAPI } from "../lib/fetch";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    console.log("Starting OAuth flow...");
    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(authenticated)/tabs"),
    });

    if (createdSessionId) {
      console.log("Setting active session...");
      await setActive({ session: createdSessionId });

      if (signUp?.createdUserId) {
        console.log("Creating user in API...");
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: `${signUp.firstName} ${signUp.lastName}`,
            email: signUp.emailAddress,
            clerkId: signUp.createdUserId,
          }),
        });
      }

      return {
        success: true,
        code: "success",
        message: "You have successfully signed in with Google",
      };
    } else {
      throw new Error("No session created");
    }
  } catch (err: any) {
    console.error("Google OAuth Error:", err);
    return {
      success: false,
      code: err.code || "unknown_error",
      message: err.message || "An unknown error occurred",
    };
  }
};
