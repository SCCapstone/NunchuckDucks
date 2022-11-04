import { View, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { PostList } from "../components/PostList";

export function MutualScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <PostList />
      <Button
        title="Create Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
    </View>
  );
}
