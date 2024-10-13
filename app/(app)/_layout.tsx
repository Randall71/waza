import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useSession } from "~/contexts/sessionContext";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  console.log(session, "SESSION ON (APP) LAYOUT");

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  return <Stack />;
}
