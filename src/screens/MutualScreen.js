import { View, Button, Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PostList from "../components/PostList";

export function MutualScreen() {
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Create Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Button title="Refresh" onPress={() => setRefresh(!refresh)} />
      <PostList refresh={refresh} setRefresh={setRefresh} />
      <Text>hi</Text>
    </View>
  );
}
