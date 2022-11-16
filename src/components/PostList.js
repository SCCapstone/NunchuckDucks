import { ScrollView, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Post as PostSchema } from "../models";
// PostSchema, the schema above, and Post, the component below
import Post from "./Post";

export function PostList() {
  const [posts, setPosts] = useState([]); // posts: all graphql post entries

  async function fetchPosts() {
    const allPosts = await DataStore.query(PostSchema); // graphql query for all posts
    setPosts(allPosts); // set posts equal to found posts
  }

  useEffect(
    () => {
      // PostList runs this stuff after every render
      fetchPosts(); // it fetches all posts
      /*const subscription = DataStore.observe(PostSchema).subscribe(() =>
      fetchPosts()
    );*/
    },
    [
      /* TODO make a "refresh" variable that, when activated, runs this useEffect */
    ]
  );

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
