<<<<<<< HEAD
import { ScrollView, View, Text } from "react-native";
import HomeHeader from "../components/Header"
export function ExploreScreen({navigation}) {
=======
import { ScrollView, Text, Button } from "react-native";
import { Auth } from "aws-amplify";

export function ExploreScreen({ signOut }) {
>>>>>>> 8f35a939f3befaa8fe16fe1a7e11fb90a53d8bca
  return (
    <>
    <View>
      <HomeHeader />
    </View>
    
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
        <Text>This is the explore screen</Text>
      </ScrollView></>
  );
}
