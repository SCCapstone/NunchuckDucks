import { ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Post as PostSchema } from "../../models";
import { getPostsForMutualFeedFromAWS, getUsersFollowed } from "../../crud/PostOperations";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
import { useNetInfo } from "@react-native-community/netinfo";
// PostSchema, the schema above, and Post, the component below
import Post from "../Post";
import {
  cacheImageFromAWS,
  deleteCachedFile,
  getImageFromCache,
  updatePfpCache,
  getPostsFromCache,
  cachePosts,
  findFileInCache,
  getCachedCurrUser,
  cacheCurrUser,
  getAllCachedFiles,
  cachePostsThatShouldBeCached,
} from "../../crud/CacheOperations";

export default function PostList(props) {
  const [posts, setPosts] = useState([]); // posts: all graphql post entries
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;
  // used to guarantee that cached posts are gathered before any backend action occurs
  const [postsInitialCompleted, setPostsInitialCompleted] = useState(false);
  // used to compare cached posts length to backend to see if the cached needs to be updated
  const [postLength, setPostLength] = useState(0);
  // used to request that the current username be cached for use in postList, profile screen, etc
  const [usernameNeeded, setUsernameNeeded] = useState(false);
  const [username, setUsername] = useState("");
  // used to avoid doing backend queries if no connection is available yet
  const networkConnection = useNetInfo();

  async function fetchPostsFromAWS() {
    // gets JSON Object full of Post types; these are read as JSON, but are NOT augmentable.
    let postsFromAWS = await getPostsForMutualFeedFromAWS(username);

    // turns posts into a true JSON object, allowing for augmentation as needed
    let postsString = JSON.stringify(postsFromAWS);
    let postsObject = JSON.parse(postsString);
    return postsObject;
  }

  async function fetchPostsFromCache() {
    // gets JSON Object of all posts saved in cache
    let postsFromCache = await getPostsFromCache();
    await setPosts(...posts, postsFromCache);
    await setPostLength(postsFromCache.length);
    //await setPostsInitial(true);
    console.log("posts have been set to cache for the initial render");
    // TODO: if first from cache is from over a week ago, clear cache and set needToCache to true
    if (postsFromCache !== null) {
      return postsFromCache;
    } else {
      console.log("No posts in cache, waiting for internet connection to get new posts");
      return [];
    }
  }

  async function cacheAllPostsFromAWS(postsFromAWS) {
    // caches posts from AWS and also deletes old cache
    let postNames = [];
    for (let i = 0; i < postsFromAWS.length; i++) {
      let username = postsFromAWS[i].username;
      let postImage = postsFromAWS[i].photo;
      // postImage equals username/filename.png
      let postImageName = postImage.substring(postImage.indexOf("/") + 1);
      let postPfp = await getImageFromCache(username, "pfp.png");
      let postImgCache = await getImageFromCache(username, postImageName);
      postsFromAWS[i].cachedPostPicture = postImgCache;
      postsFromAWS[i].cachedPfp = postPfp;
      if (i < 20) {
        // only first 20 posts should be cached
        postNames.push(username + "pfp.png"); // add the pfps that should be cached (redundant pfps will exist)
        postNames.push(username + postImageName); // add the posts that should be cached
        postsFromAWS[i].shouldBeCached = true;
      } else {
        postsFromAWS[i].shouldBeCached = false;
        postsFromAWS[i].cachedPostPicture = "";
      }
    }
    await cachePosts(postsFromAWS);
    await setPosts(postsFromAWS);
    await setPostLength(postsFromAWS.length);
    // we may want to move this to the settings page? Probably unnecessary to do every cacheAWS call

    await cachePostsThatShouldBeCached(postNames);
  }

  async function updatePfpCacheForFollowing() {
    const username = await getCurrentAuthenticatedUser();
    const followers = await getUsersFollowed(username);
    await updatePfpCache(username); // updating pfp cache for the current user
    console.log("Heres the people you follow:", followers);
    for (let i = 0; i < followers.length; i++) {
      await updatePfpCache(followers[i]); // updating pfp cache for all people you are following
    } // TODO: delete pfp cache of a user when you unfollow them
    console.log("performed updatepfpcache for everybody");
  }

  async function doStuff() {
    console.log("Network connection acquired");

    if (usernameNeeded === true) {
      console.log("Fetching username of current user from AWS");
      let usernameFromAWS = await cacheCurrUser();
      await setUsername(usernameFromAWS);
      await setUsernameNeeded(false);
    }
    await updatePfpCacheForFollowing(username);
    let postsFromAWS = await fetchPostsFromAWS(username);
    if (postsFromAWS.length !== postLength) {
      console.log("looks like we need to cache");
      cacheAllPostsFromAWS(postsFromAWS);
    }
  }

  async function getPostCache() {
    console.log("Rendering cached posts upon initial render");
    let usernameFromCache = await getCachedCurrUser();
    if (usernameFromCache === null) {
      await setUsernameNeeded(true);
    } else {
      await setUsername(usernameFromCache);
    }
    let postsFromCache = await fetchPostsFromCache();
    await setPostsInitialCompleted(true);
    console.log(postsFromCache.length, "JAA");
  }

  useEffect(() => {
    if (postsInitialCompleted === false) {
      getPostCache();
    }
    if (networkConnection.isConnected === true && postsInitialCompleted === true) {
      doStuff();
    }

    console.log("PostList refreshed");
  }, [refresh, networkConnection]);

  return <FlatList data={posts} renderItem={({ item }) => <Post entry={item} />} keyExtractor={(item) => item.id} />;
}
