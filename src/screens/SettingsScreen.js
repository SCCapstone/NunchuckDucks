import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header/Header";
export function SettingsScreen({navigation}) {
  return (
    <View
      style={style.container}
    >
      <Header title={"Settings"} />

      <Text>Toggle private account eventually goes here</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})
