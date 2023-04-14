import { FlatList } from "react-native";
import { getUserPostsForProfileScreenFromAWS } from "../../crud/PostOperations";
import { useState, useEffect } from "react";
import Post from "../Post";

export default function ProfilePostList() {
  const [posts, setPosts] = useState([]);

  async function onlineOperation() {
    let postsFromAWS = await getUserPostsForProfileScreenFromAWS();
    setPosts(postsFromAWS);
  }
  useEffect(() => {
    onlineOperation();
  }, []);
  return (
    <>
      <FlatList data={posts} renderItem={({ item }) => <Post entry={item} />} keyExtractor={(item) => item.id} />
    </>
  );
}
