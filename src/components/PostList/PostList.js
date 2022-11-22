import { ScrollView, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Post as PostSchema } from "../../models";
// PostSchema, the schema above, and Post, the component below
import Post from "../Post";

export default function PostList(props) {
  const [posts, setPosts] = useState([]); // posts: all graphql post entries
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;
  // TODO make function that sorts all posts by CREATED AT date, as sorting by photoname will only work
  // for one user (alphabetically, sorting posts by multiple users would not reflect createdAt date)
  async function fetchPosts() {
    const allPosts = await DataStore.query(PostSchema, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    });
    setPosts(allPosts); // set posts equal to found posts
  }

  useEffect(() => {
    // PostList runs this stuff after every render
    fetchPosts(); // it fetches all posts
    console.log("PostList refreshed");
  }, [refresh]);

  const styles = StyleSheet.create({
    list: {
      alignItems: "center",

      /*width: 500,
      height: 500,*/
      display: "flex",
      backgroundColor: "white",
    },
  });
  // creates a Post for each postEntry, passes the post info, and refresh prop
  // so that whenever neew posts created, they grab the picture that they are assigned
  return (
    <ScrollView contentContainerStyle={styles.list}>
      {posts.map((postEntry) => (
        <Post entry={postEntry} key={postEntry.id} refresh={refresh} />
      ))}
    </ScrollView>
  );
}
