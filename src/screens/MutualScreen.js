import { View, Button, Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PostList from "../components/PostList";
import HomeHeader from "../components/HomeHeader/HomeHeader";

export function MutualScreen() {
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={{marginBottom: "22%"}}>
      <HomeHeader handlePress={() => setRefresh(!refresh)}/>

      <PostList refresh={refresh} setRefresh={setRefresh} />
      <Text>hi</Text>
    </View>
  );
}
