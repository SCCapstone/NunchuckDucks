import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function GoalsScreen() {
  const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <Text>These are ur goals</Text>
      <Pressable onPress={() => nav.navigate("CreateGoal")}>
        <Text>Go to goals screen</Text>
      </Pressable>
    </View>
  );
}
