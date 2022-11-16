import { View, Text } from "react-native";
import { Auth } from 'aws-amplify';
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "aws-amplify";

export function ProfileScreen({user, props}) {
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
      <Text>Hello {user.username}</Text>
    </View>
  );
}
