import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import GoalSummary from "../components/GoalSummary";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import React from "react";
import { getFollowsList } from "../crud/FollowingOperations";
import { getFollowersList } from "../crud/FollowersOperations";
import { updateCurrentStreak } from "../crud/UserOperations";
import { saveImageToAWS, getCurrentUser, cacheRemoteUri } from "../crud/CacheOperations";
import ProfileMini from "../components/ProfileMini";
import Bio from "../components/Bio";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import SignOutButton from "../components/signoutbutton/SignOutButton";
import * as ImagePicker from "expo-image-picker";
import ChangeBioModal from "../components/modals/ChangeBioModal";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import Header from "../components/Header";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNetInfo } from "@react-native-community/netinfo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfilePostList from "../components/ProfilePostList/ProfilePostList";
import { getAndObserveFollowers, getAndObserveFollowing } from "../crud/observeQueries/FollowerFollowingObserveQueries";

const Tab = createMaterialTopTabNavigator();

//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen(props) {
  const navigation = useNavigation();
  //const [refresh, setRefresh] = useState(false);
  //const { refresh, setRefresh } = route.params;
  const networkConnection = useNetInfo();
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;
  const [usernameSet, setUsernameSet] = useState(false);
  const [username, setUsername] = useState("");
  const [retrieveFollowerCount, setRetrieveFollowerCount] = useState(0);
  const [retrieveFollowingCount, setRetrieveFollowingCount] = useState(0);
  const [followercount, setFollowerCount] = useState("-");
  const [followingcount, setFollowingCount] = useState("-");
  const [modalVisible, setModalVisible] = useState(false);
  const [showMakePfp, setShowMakePfp] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);

  useEffect(() => {
    renderProfileInfo();
    createObservers();
  }, []);

  useEffect(() => {
    getFollowersCount(username);
  }, [username, retrieveFollowerCount]);

  useEffect(() => {
    getFollowingCount(username);
  }, [username, retrieveFollowingCount]);

  const showPfpUploadedToast = (usr) => {
    Toast.show({
      type: "success",
      text1: "Successfully stored your new pfp!",
      text2: "Lookin' good, " + usr + " 😎",
      position: "bottom",
      visibilityTime: 6000,
      bottomOffset: 80,
    });
  };
  const showPfpNotUploadedToast = (usr) => {
    if (usr === "") {
      usr = "friend";
    }
    Toast.show({
      type: "error",
      text1: "Oops, there was an issue uploading your new pfp...",
      text2: "Try again later. Sorry, " + usr + " 😔",
      position: "bottom",
      visibilityTime: 6000,
      bottomOffset: 80,
    });
  };

  const showPfpCantChangeToast = () => {
    Toast.show({
      type: "error",
      text1: "No Network connection detected.",
      text2: "Can't change profile picture.",
      position: "bottom",
      visibilityTime: 4000,
      bottomOffset: 80,
    });
  };

  async function createObservers() {
    let newUsername = await getCurrentUser();
    if (!newUsername) {
      console.error("Retrieving username on Profile Screen");
      return;
    }
    getAndObserveFollowers(newUsername, setRetrieveFollowerCount);
    getAndObserveFollowing(newUsername, setRetrieveFollowingCount);
  }

  async function renderProfileInfo() {
    let newUsername = await getCurrentUser();
    if (newUsername !== username) {
      setUsername(newUsername);
    } else {
      console.error("Fetching username for Profile Screen");
      return;
    }
    let currStreak = await updateCurrentStreak(newUsername);
    setStreak(currStreak);
    if (streak > 0) {
      setShowStreak(true);
    } else {
      setShowStreak(false);
    }
    setUsernameSet(true);
  }

  async function getFollowingCount(username) {
    if (!username) return;
    const followingList = await getFollowsList(username);
    if (!followingList || !Array.isArray(followingList)) return;
    setFollowingCount(followingList.length);
  }

  async function getFollowersCount(username) {
    if (!username) return;
    const followersList = await getFollowersList(username);
    if (!followersList || !Array.isArray(followersList)) return;
    setFollowerCount(followersList.length);
  }

  function handleProfileImageClick() {
    if (networkConnection.isConnected) {
      addProfileImage();
    } else {
      showPfpCantChangeToast();
    }
  }
  const addProfileImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images /*Only allow image upload */,
      allowsEditing: true /*true= pull up an editing interface after image upload */,
      aspect: [1, 1] /*1:1 image ratio, so it will be a square */,
      quality: 1 /*highest quality image possible, on a scale of 0-1 we want 1 lol */,
    });
    // setImage(_image.uri);
    try {
      let username = await getCurrentUser();
      const response = await fetch(_image.uri);
      const blob = await response.blob();
      const fileName = username + "/pfp.png";
      let pfpUploaded = await saveImageToAWS(fileName, blob);
      await cacheRemoteUri(username, "pfp.png");
      setRefresh(!refresh);
      if (pfpUploaded === true) {
        showPfpUploadedToast(username);
      } else {
        showPfpNotUploadedToast(username);
      }
      setShowMakePfp(false);
    } catch (error) {
      console.log("Error uploading image to S3", error);
    }
  };

  return (
    <>
      <View testID="Profile_Screen_Header">
        <Header title={"Profile"} style={{ backgroundColor: "white" }} />
      </View>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            padding: 10,
            backgroundColor: grayThemeColor,
            borderWidth: 2,
            borderRadius: 20,
            alignSelf: "center",
            width: "70%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {usernameSet && showStreak && (
              <View>
                <Image source={require("../../assets/icons/Gymbit_Icons_Trans/flame.png")} style={styles.flame} />
                <Text style={styles.streak}>{streak}</Text>
              </View>
            )}
            <ProfileMini onClick={() => handleProfileImageClick()} username={username} refresh={refresh} setRefresh={setRefresh} />
            <View
              style={{
                flexdirection: "column",
                paddingTop: 5,
                paddingLeft: 15,
              }}
            >
              <Text style={styles.username}>@{username}</Text>
              <View style={{ paddingTop: 5, flexDirection: "row" }}>
                <View style={styles.followingContainer}>
                  <Text style={styles.followingText}>Following</Text>
                  <Text testID="Profile_Screen.Follower_Number" style={styles.followingNumber} onPress={() => navigation.navigate("Followers", { isFollowerPage: true })}>
                    {followingcount}
                  </Text>
                </View>
                <View style={styles.followingContainer}>
                  <Text style={styles.followingText}>Followers</Text>
                  <Text
                    style={styles.followingNumber}
                    onPress={() =>
                      navigation.navigate("Followers", {
                        isFollowerPage: false,
                      })
                    }
                  >
                    {followercount}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)} testID="Profile_Screen.Bio">
            <Bio username={username}/>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <ChangeBioModal modalVisible={modalVisible} setModalVisible={setModalVisible} testID="Profile_Screen.Bio_Modal" />
        <View
          style={{
            flexDirection: "row",
            paddingTop: 15,
            paddingBottom: 15,
            maxWidth: 250,
          }}
        ></View>
      </View>
      <Tab.Navigator initialRouteName="GoalSummary" tabBarPosition="top">
        <Tab.Screen name="Goals Summary" testID="Profile_Screen.Goals_Summary_Button">
          {(props) => (
            <GoalSummary {...props} username={username} isCurrentUser={true} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Your Posts" component={ProfilePostList}/>
      </Tab.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  pfpUploaded: {
    width: 200,
    height: 100,
    borderColor: blueThemeColor,
    backgroundColor: grayThemeColor,
  },
  username: {
    //paddingTop: 30,
    paddingBottom: 0,

    fontSize: 20,
    fontWeight: "bold",
  },
  mainbutton: {
    fontSize: 30,
  },
  followercount: {
    fontSize: 20,
    color: "black",
  },
  //calendar style is placeholder for calendar mini.
  calendar: {
    width: 250,
    height: 180,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: blueThemeColor,
    backgroundColor: grayThemeColor,
  },
  followingContainer: {
    width: 80,
    height: 50,
    //borderColor: "black",
    //borderWidth: 1,
    minHeight: "auto",
    flexDirection: "column",
    alignItems: "center",
    //alignSelf: "flex-start",
  },
  followingText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  followingNumber: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
    color: blueThemeColor,
  },
  bioText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  },
});
