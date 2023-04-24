import { FlatList } from "react-native";
import { getUserPostsForProfileScreenFromAWS } from "../../crud/PostOperations";
import { useState, useEffect } from "react";
import Post from "../Post";
import { getAndObservePersonalPosts } from "../../crud/observeQueries/PostObserveQueries";

export default function ProfilePostList() {
  const [retrievePosts, setRetrievePosts] = useState(0);
  const [posts, setPosts] = useState([]);

  async function onlineOperation() {
    let postsFromAWS = await getUserPostsForProfileScreenFromAWS();
    if (!postsFromAWS) return;
    setPosts(postsFromAWS);
  }

  async function observePersonalPosts() {
    const subs = await getAndObservePersonalPosts(setRetrievePosts);
  }

  useEffect(() => {
    observePersonalPosts();
  }, []);

  useEffect(() => {
    onlineOperation();
  }, [retrievePosts]);
  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post entry={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
