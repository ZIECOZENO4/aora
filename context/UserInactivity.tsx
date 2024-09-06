import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log("🚀 ~ handleAppStateChange ~ nextAppState", nextAppState);

    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      if (startTime !== null) {
        const elapsed = Date.now() - startTime;
        console.log("🚀 ~ handleAppStateChange ~ elapsed:", elapsed);

        if (elapsed > 3000 && isSignedIn) {
          router.replace("/(authenticated)/(modals)/lock");
        }
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    setStartTime(Date.now());
  };

  return children;
};
