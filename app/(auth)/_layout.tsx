import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
