import { ScrollView, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/native";
import { Post } from "../models";

export function MutualScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  async function fetchPosts() {
    const allPosts = await DataStore.query(Post);
    setPosts(allPosts);
  }

  useEffect(() => {
    //fetchPosts();
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts());
    return () => subscription.unsubscribe();
  });

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {posts.map((post) => (
        <Text>{post.caption}</Text>
      ))}
      <Button
        title="Create Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
    </ScrollView>
  );
}
