import React from "react";
import { Text, View } from "react-native";
import { Input } from "~/components/ui/input";

export default function Index() {
  const [value, setValue] = React.useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text className="text-red-500">Hello</Text>

      <Input
        placeholder="Write some stuff..."
        value={value}
        onChangeText={onChangeText}
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
      />
    </View>
  );
}
