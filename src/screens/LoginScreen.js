import { Auth } from "aws-amplify";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
export function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        This is the login screen. Don't have an account? Press the button below.
      </Text>
      <Button
        title="btn"
        onPress={() => navigation.navigate("CreateAccount")}
      />
    </View>
  );
}
