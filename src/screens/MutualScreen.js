import { View, Button, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { PostList } from "../components/PostList";

export function MutualScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Create Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <PostList />
      <Text>hi</Text>
    </View>
  );
}
