import { ScrollView, View, Text } from "react-native";
import HomeHeader from "../components/Header"
export function ExploreScreen({navigation}) {
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
