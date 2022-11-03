import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, Text } from "react-native";
export function ExploreScreen({navigation}) {
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

      <Button
        title="Go to settings screen"
        onPress = {() => navigation.navigate('Settings')}
        />
    </ScrollView>
  );
}
