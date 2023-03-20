import { ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Post as PostSchema } from "../../models";
import { getPostsForMutualFeedFromAWS, getUsersFollowed, getUsersFollowedIds } from "../../crud/PostOperations";
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
  logCache,
} from "../../crud/CacheOperations";
import { getFollowsList } from "../../crud/FollowingOperations";

export default function PostList(props) {
  const list = useRef(null);
  const [posts, setPosts] = useState([]); // posts: all graphql post entries
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;
  // used to guarantee that cached posts are gathered before any backend action occurs
  const [postsInitialCompleted, setPostsInitialCompleted] = useState(false);
  // used to compare cached posts length to backend to see if the cached needs to be updated
  const [postLength, setPostLength] = useState(0);
  const [swipeRefresh, setSwipeRefresh] = useState(true);
  const [username, setUsername] = useState("");
  // used to avoid doing backend queries if no connection is available yet
  const networkConnection = useNetInfo();

  async function fetchPostsFromAWS(usernameFromAWS) {
    // gets JSON Object full of Post types; these are read as JSON, but are NOT augmentable.
    let postsFromAWS = await getPostsForMutualFeedFromAWS(usernameFromAWS);

    // turns posts into a true JSON object, allowing for augmentation as needed
    let postsString = JSON.stringify(postsFromAWS);
    let postsObject = JSON.parse(postsString);
    return postsObject;
  }

  async function fetchPostsFromCache() {
    // gets JSON Object of all posts saved in cache
    let postsFromCache = await getPostsFromCache();
    setPosts(...posts, postsFromCache);
    setPostLength(postsFromCache.length);
    //await setPostsInitial(true);
    // TODO: if first from cache is from over a week ago, clear cache and set needToCache to true
    if (postsFromCache !== null) {
      return postsFromCache;
    } else {
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
      //let postImgCache = await getImageFromCache(username, postImageName);
      postsFromAWS[i].cachedPfp = postPfp;

      if (i < 30) {
        // only first 30 posts should be cached
        postNames.push(username + "pfp.png"); // add the pfps that should be cached (redundant pfps will exist)
        postNames.push(username + postImageName); // add the posts that should be cached
        postsFromAWS[i].shouldBeCached = true;
      } else {
        postsFromAWS[i].shouldBeCached = false;
      }
    }
    console.log("Hello there");
    await cachePosts(postsFromAWS);
    setPosts(postsFromAWS);
    setPostLength(postsFromAWS.length);
    // we may want to move this to the settings page? Probably unnecessary to do every cacheAWS call

    //this is used to set what should be cached so deleteOldCache in settings can delete unnecessary cache
    await cachePostsThatShouldBeCached(postNames);
  }

  async function updatePfpCacheForFollowing(usernameFromAWS) {
    //const username = await getCurrentAuthenticatedUser();
    const followers = await getUsersFollowed(usernameFromAWS);
    await updatePfpCache(usernameFromAWS); // updating pfp cache for the current user
    for (let i = 0; i < followers.length; i++) {
      await updatePfpCache(followers[i]); // updating pfp cache for all people you are following
    } // TODO: delete pfp cache of a user when you unfollow them
  }

  async function cacheStuffFromAWS() {
    console.log("Network connection acquired");

    // Username not cached; cache username
    let usernameFromAWS = "";
    if (username === "") {
      // if username is not cached
      usernameFromAWS = await cacheCurrUser();
      setUsername(usernameFromAWS);
    } else {
      usernameFromAWS = username;
    }
    // Update pfp cache for all follows; causes few seconds delay in rendering posts :((
    //await updatePfpCacheForFollowing(usernameFromAWS);
    //let temp = posts;
    //setPosts([]);
    //setPosts(temp);
    // Fetching posts from AWS
    let postsFromAWS = await fetchPostsFromAWS(usernameFromAWS);
    console.log(postsFromAWS);
    setPosts(postsFromAWS);
    /*let isCacheRefreshNeeded = await checkIfRefreshCacheNeeded(postsFromAWS);
    if (isCacheRefreshNeeded === true) {
      cacheAllPostsFromAWS(postsFromAWS);
    }*/
    setSwipeRefresh(false);
  }

  async function checkIfRefreshCacheNeeded(postsFromAWS) {
    // comparison saves computational time
    if (postsFromAWS.length !== postLength) {
      return true;
    }
    // checks if strings are equal; if not, then cache
    /* this does not work as expected
    let postsString = JSON.stringify(posts);
    let postsFromAWSString = JSON.stringify(postsFromAWS);
    if (postsString !== postsFromAWSString) {
      console.log("Cached posts and AWS posts differ; need to cache");
      return true;
    }*/
    return false;
  }

  // Fetches
  async function fetchPostCache() {
    let usernameFromCache = await getCachedCurrUser();
    setUsername(usernameFromCache);
    await fetchPostsFromCache();
    setPostsInitialCompleted(true);
    setRefresh(!refresh);
  }

  useEffect(() => {
    // First thing done upon startup of the app
    if (postsInitialCompleted === false) {
      fetchPostCache(); // will set postsInitialCompleted to true after completion
    }
    if (networkConnection.isConnected === true && postsInitialCompleted === true) {
      //list.current.scrollToIndex({ index: 0 });
      cacheStuffFromAWS();
    } else {
      // in case there is no connection, a swipe refresh should end with nothing happening
      // need to test when using app with no connection
      setSwipeRefresh(false);
    }
    cacheStuffFromAWS();
    console.log("PostList refreshed");
  }, [refresh, networkConnection]);

  return (
    <FlatList
      ref={list}
      data={posts}
      renderItem={({ item }) => <Post entry={item} />}
      refreshing={swipeRefresh}
      onRefresh={() => {
        setSwipeRefresh(true);
        setRefresh(!refresh);
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
