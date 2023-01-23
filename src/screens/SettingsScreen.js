import { View, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import Header from "../components/Header/Header";
export function SettingsScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center"
      }}
    >
      <Header title={"Settings"} />

      <Text>Toggle private account eventually goes here</Text>
    </View>
  );
}
