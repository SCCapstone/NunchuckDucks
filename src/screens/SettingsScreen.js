import { View, Text } from "react-native";
import { BackButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
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

      <BackButton handlePress={() => navigation.goBack()}/>
    </View>
  );
}
