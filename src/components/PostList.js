import { ScrollView, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Post as PostSchema } from "../models";
import { Post } from "./Post";

export default function PostList() {
  const [posts, setPosts] = useState([]); // posts: all graphql post entries

  async function fetchPosts() {
    const allPosts = await DataStore.query(PostSchema); // graphql query for all posts
    setPosts(allPosts); // set posts equal to found posts
    console.log(allPosts);
  }

  useEffect(() => {
    // PostList runs this stuff after every render
    fetchPosts(); // it fetches all posts
    /*const subscription = DataStore.observe(PostSchema).subscribe(() =>
      fetchPosts()
    );*/
  }, []);

  const styles = StyleSheet.create({
    list: {
      alignItems: "center",

      /*width: 500,
      height: 500,*/
      display: "flex",
      backgroundColor: "white",
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {posts.map((postEntry) => (
        <Post entry={postEntry} key={postEntry.id} />
      ))}
    </ScrollView>
  );
}
