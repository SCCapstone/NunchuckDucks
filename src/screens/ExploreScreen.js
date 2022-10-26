import { ScrollView, Text } from "react-native";
export function ExploreScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <Text>This is the explore screen</Text>
    </ScrollView>
  );
}
