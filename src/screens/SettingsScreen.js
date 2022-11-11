import { View, Text } from "react-native";
import { BackButton } from "../components/Buttons";
export function SettingsScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <Text>This is the settings screen</Text>
    </View>
  );
}
