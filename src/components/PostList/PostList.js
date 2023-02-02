import { ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Post as PostSchema } from "../../models";
import { getPostsForMutualFeed, getUsersFollowed } from "../../crud/PostOperations";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
// PostSchema, the schema above, and Post, the component below
import Post from "../Post";
import { cacheImageFromAWS, deleteCachedFile, getImageFromCache, updatePfpCache } from "../../crud/CacheOperations";

export default function PostList(props) {
  const [posts, setPosts] = useState([]); // posts: all graphql post entries
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;
  // TODO make function that sorts all posts by CREATED AT date, as sorting by photoname will only work
  // for one user (alphabetically, sorting posts by multiple users would not reflect createdAt date)
  async function fetchPosts() {
    const username = await getCurrentAuthenticatedUser();
    let posts = await getPostsForMutualFeed(username);
    setPosts(posts);
    console.log("fetchPosts operation completed, posts length:", posts.length);
    // set posts equal to found posts
  }
  async function updatePfpCacheForFollowing() {
    console.log("Inside updatePfpcacheforfollowing");
    const username = await getCurrentAuthenticatedUser();
    const followers = await getUsersFollowed(username);
    console.log("Heres the followings:", followers);
    for (let i = 0; i < followers.length; i++) {
      await updatePfpCache(followers[i]);
    }
    console.log("performed updatepfpcache for everybody");
  }

  async function updatePostImgCache() {
    let postsToCache = posts.slice(0, 20); // if there are less than 20 posts, will extend to end of array
    for (let i = 0; i < postsToCache.length; i++) {
      let username = postsToCache[i].username;
      let postImage = postsToCache[i].photo;
      let postImageName = postImage.substring(postImage.indexOf("/") + 1);
      let result = await getImageFromCache(username, postImageName + ".png");
      if (result === "") {
        await cacheImageFromAWS(username, postImageName, true);
      }
    }
    for (let i = postsToCache.length; i < posts.length; i++) {
      let username = posts[i].username;
      let postImage = posts[i].photo;
      let postImageName = postImage.substring(postImage.indexOf("/") + 1);
      let result = await getImageFromCache(username, postImageName + ".png");
      if (result !== "") {
        await deleteCachedFile(username, postImageName + ".png");
      }
    }
  }

  useEffect(() => {
    // PostList runs this stuff after every render
    fetchPosts(); // it fetches all posts
    console.log("fetchposts done, should be moving on to updatePfpCacheforFollowing now");
    updatePfpCacheForFollowing();
    updatePostImgCache();
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
    <FlatList data={posts} renderItem={({ item }) => <Post entry={item} />} keyExtractor={(item) => item.id} />
    /*<FlatList contentContainerStyle={styles.list}>
      {posts.map((postEntry) => (
        <Post entry={postEntry} key={postEntry.id} refresh={refresh} />
      ))}
    </FlatList>*/
  );
}
