import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Ionicons } from "@expo/vector-icons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React from "react";
import { Try } from "expo-router/build/views/Try";
import { useSession } from "~/contexts/sessionContext";
import { router } from "expo-router";

export default function SignUpScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const { signIn } = useSession();

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const request = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emilys",
          email: "emily.johnson@x.dummyjson.com",
          password: "emilyspass",
        }),
      });

      const response = await request.json();
      console.log(response, "RESPONSE OF GETTING THINGS DONE ");
      setIsLoading(false);
      if (response) {
        console.log(response?.accessToken, "ACCESS TOKEN");
        signIn(response?.accessToken);
        router.dismissAll();
        router.replace("/(app)");
      }
    } catch (error) {
      throw new Error("Failed to sign up", { cause: error });
    }
  };
  return (
    <View className="flex-1 space-y-8 mb-6 px-4">
      <SegmentedControl
        values={["S'inscrire", "Se connecter"]}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setName("");
          setEmail("");
          setPassword("");
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={{
          marginTop: 50,
          marginBottom: 20,
          height: 50,
        }}
      />

      {selectedIndex === 0 && (
        <View className="space-y-4 mb-6 mt-10">
          {/* <View className="flex-row items-center">
            <Ionicons
              name="person-outline"
              size={24}
              color="gray"
              className="mr-2"
            /> */}

          {/* </View> */}

          <Input
            placeholder="Entrez votre nom"
            value={name}
            onChangeText={setName}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="mb-10"
          />
          <Input
            placeholder="Entrez votre email"
            value={email}
            onChangeText={setEmail}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="mb-10"
            keyboardType="email-address"
          />

          <Input
            placeholder="Entrez votre mot de passe"
            secureTextEntry={true}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            value={password}
            onChangeText={setPassword}
            className="mb-10"
          />

          <Button onPress={handleSignUp} disabled={isLoading} className="mt-10">
            <Text>{isLoading ? "Chargement..." : "Créer un compte"}</Text>
          </Button>
        </View>
      )}

      {selectedIndex === 1 && (
        <View className="space-y-4 mb-6 mt-10">
          <Input
            placeholder="Entrez votre email"
            value={email}
            onChangeText={setEmail}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="mb-10"
            keyboardType="email-address"
          />

          <Input
            placeholder="Entrez votre mot de passe"
            secureTextEntry={true}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            value={password}
            onChangeText={setPassword}
            className="mb-10"
          />

          <Button className="mt-10">
            <Text>Créer un compte</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
