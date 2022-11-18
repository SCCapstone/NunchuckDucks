import { View, Text, Button } from "react-native";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "aws-amplify";
import SignOutButton from "../components/signoutbutton/SignOutButton";

export function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}
