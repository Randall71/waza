import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
