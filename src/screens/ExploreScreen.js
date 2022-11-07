import { ScrollView, Text, Button } from "react-native";
import { Auth } from "aws-amplify";

export function ExploreScreen({signOut}) {
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

      <Button title='Sign Out' onPress={Auth.signOut()} />
    </ScrollView>
  );
}
