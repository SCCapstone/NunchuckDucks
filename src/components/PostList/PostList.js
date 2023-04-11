import { ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Post as PostSchema } from "../../models";
import { getPostsForMutualFeedFromAWS, getUsersFollowed, getUsersFollowedIds } from "../../crud/PostOperations";
import { useNetInfo } from "@react-native-community/netinfo";
// PostSchema, the schema above, and Post, the component below
import Post from "../Post";
import { getPostsFromCache, cachePosts, getCachedCurrUser, cacheCurrUser, cacheRemoteUri } from "../../crud/CacheOperations";
import { getFollowsList } from "../../crud/FollowingOperations";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import FastImage from "react-native-fast-image";

export default function PostList(props) {
  const list = useRef(null);
  const [posts, setPosts] = useState([]); // posts: all graphql post entries
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;
  const setIsEmpty = props.setIsEmpty;
  // used to guarantee that cached posts are gathered before any backend action occurs
  const [postsInitialCompleted, setPostsInitialCompleted] = useState(false);
  const [offlineInitialCompleted, setOfflineInitialCompleted] = useState(false);
  const [onlineInital, setOnlineInitial] = useState(true);
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
    await cachePosts(postsFromAWS);
    setPosts(postsFromAWS);
    setPostLength(postsFromAWS.length);
  }

  async function doOnlineOperations() {
    // Username not cached; cache username
    let usernameFromAWS = "";
    if (username === "" || username === null) {
      // if username is not cached
      usernameFromAWS = await cacheCurrUser();
      setUsername(usernameFromAWS);
    } else {
      usernameFromAWS = username;
    }
    let followers = await getUsersFollowed(usernameFromAWS);
    await cachePfpInitially(usernameFromAWS, followers);

    if (offlineInitialCompleted === true) {
      showOnlineToast(usernameFromAWS);
    } else if (onlineInital === true) {
      if (followers.length === 0) {
        showWelcomeToast();
      } else {
        showWelcomeBackToast(usernameFromAWS);
      }
      setOnlineInitial(false);
    }

    /*let temp = posts;
    setPosts([]);
    setPosts(temp);*/
    // Fetching posts from AWS
    let postsFromAWS = await fetchPostsFromAWS(usernameFromAWS);
    if (postsFromAWS.length === 0) {
      setIsEmpty(true);
    }
    setPosts(postsFromAWS);
    let isCacheRefreshNeeded = await checkIfRefreshCacheNeeded(postsFromAWS);
    if (isCacheRefreshNeeded === true) {
      cacheAllPostsFromAWS(postsFromAWS);
    }
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
  async function cachePfpInitially(username, followers) {
    //let followers = await getUsersFollowed(username);
    await cacheRemoteUri(username, "pfp.png");
    for (let i = 0; i < followers.length; i++) {
      await cacheRemoteUri(followers[i], "pfp.png");
    }
    return followers.length;
  }

  const showWelcomeToast = () => {
    Toast.show({
      type: "success",
      text1: "Welcome to GymBit!",
      text2: "We're glad you're here 😁💪",
      position: "bottom",
      visibilityTime: 4000,
      bottomOffset: 80,
    });
  };

  const showOnlineToast = (usr) => {
    Toast.show({
      type: "success",
      text1: "You are now online!",
      text2: "Welcome back, " + usr + " 😁💪",
      position: "bottom",
      visibilityTime: 4000,
      bottomOffset: 80,
    });
  };

  const showWelcomeBackToast = (usr) => {
    Toast.show({
      type: "success",
      text1: "Welcome back, " + usr + " 💪",
      //text2: "We're glad you're here 😁💪",
      position: "bottom",
      visibilityTime: 4000,
      bottomOffset: 80,
    });
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const showNotConnectedToast = async () => {
    setOfflineInitialCompleted(true);
    Toast.show({
      type: "info",
      text1: "You're not connected to the internet 😬",
      position: "bottom",
      visibilityTime: 3000,
      bottomOffset: 80,
    });
    await delay(4000);
    Toast.show({
      type: "info",
      text1: "You can still look around 👀",
      text2: "And also create goals 💪",
      position: "bottom",
      visibilityTime: 3000,
      bottomOffset: 80,
    });
  };

  async function offlineOperations() {
    await fetchPostCache();
  }
  useEffect(() => {
    setSwipeRefresh(true);
    // First thing done upon startup of the app
    if (postsInitialCompleted === false) {
      offlineOperations(); // will set postsInitialCompleted to true after completion
    }
    if (networkConnection.isConnected) {
      //list.current.scrollToIndex({ index: 0 });
      doOnlineOperations();
    } else if (postsInitialCompleted) {
      // in case there is no connection, a swipe refresh should end with nothing happening
      // need to test when using app with no connection
      setSwipeRefresh(false);
      if (offlineInitialCompleted === false) {
        showNotConnectedToast();
      }
    }
    //console.log("PostList refreshed");
  }, [refresh, networkConnection]);

  return (
    <>
      <FlatList
        ref={list}
        data={posts}
        renderItem={({ item }) => <Post entry={item} refresh={refresh} />}
        extraData={refresh}
        refreshing={swipeRefresh}
        onRefresh={() => {
          setRefresh(!refresh);
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
