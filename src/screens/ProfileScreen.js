import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import GoalSummary from "../components/GoalSummary";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import React from "react";
import { getFollowsList } from "../crud/FollowingOperations";
import { getFollowersList } from "../crud/FollowersOperations";
import { getBio, updateProfilePicture } from "../crud/UserOperations";
import { findUserByUsername } from "../crud/UserOperations";
import {
  getLastModifiedCache,
  getLastModifiedAWS,
  cacheLastModified,
  getImageFromCache,
  cacheImageFromAWS,
  saveImageToAWS,
  getCachedCurrUser,
  getCurrentUser,
} from "../crud/CacheOperations";
import ProfileMini from "../components/ProfileMini";
import Bio from "../components/Bio";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import SignOutButton from "../components/signoutbutton/SignOutButton";
import * as ImagePicker from "expo-image-picker";
import ChangeBioModal from "../components/modals/ChangeBioModal";
import * as FileSystem from "expo-file-system";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import Header from "../components/Header";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";

//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen(props) {
  const navigation = useNavigation();
  const [usernameSet, setUsernameSet] = useState(false);
  const [username, setUsername] = useState("");
  const [followercount, setFollowerCount] = useState("");
  const [followingcount, setFollowingCount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showMakePfp, setShowMakePfp] = useState(false);
  // const [image, setImage] = useState(""); // the image src to be displayed
  const [profilePic, setProfilePic] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    renderProfileInfo();
  }, [modalVisible]);

  async function renderProfileInfo() {
    let username = await getCurrentUser();
    setUsername(username);
    setUsernameSet(true);
    //const cacheImageFileUri = cacheDirectory + username + "pfp.png";
    //const cacheLastModifiedUri = cacheDirectory + username + "pfp.png";
    //const cachedImage = await getImageFromCache(username, "pfp.png");
    //setProfilePic(cachedImage);
  }

  // async function getFollowerCount() {
  //   const followercoun = await getFollowersList(username);
  //   setFollowerCount(followercoun.length);
  // }

  // async function getFollowingCount() {
  //   const followingcoun = await getFollowsList(username);
  //   setFollowingCount(followingcoun.length);
  // }

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
      //updateProfilePicture(username, fileName);
      await saveImageToAWS(fileName, blob);
      let lastModified = await getLastModifiedAWS(username, "pfp.png");
      cacheLastModified(username, lastModified);
      let path = await cacheImageFromAWS(username, "pfp.png");
      if (path !== "") {
        setProfilePic(path);
      }
      setShowMakePfp(false);
    } catch (error) {
      console.log("Error uploading image to S3", error);
    }
    //updateProfilePicture(username,image);
  };

  return (
    <>
      <View>
        <Header title={"Profile"} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <ChangeBioModal modalVisible={modalVisible} setModalVisible={setModalVisible}></ChangeBioModal>
        <View style={{ paddingTop: 0, paddingBottom: 10, flexDirection: "row", alignContent: "center" }}>
          {usernameSet && <ProfileMini onClick={() => addProfileImage()} username={username} />}
          <Text style={styles.username}>@{username}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Bio />
        </TouchableOpacity>
        {/*<Text style={styles.username}>@{username}</Text>*/}
        <View style={{ flexDirection: "row", paddingTop: 15, paddingBottom: 15, maxWidth: 250 }}>
          {/*
    <CustomButton
    text="Add Friend"
    textStyle = {{fontSize: 17}}
    style = {{borderRadius:20}}
    //onClick = {() => }
    //TO-DO
    //onClick={needs to add friend here}
    ></CustomButton>
    */}
          <SignOutButton />
        </View>

        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <Text style={styles.followercount}>{followercount}</Text>
          <View style={{ width: 157 }}></View>
          <Text style={styles.followercount}>{followingcount}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingBottom: 30,
            paddingHorizontal: 80,
          }}
        >
          <CustomButton
            text="Followers"
            style={{ width: 100, borderRadius: 20 }}
            textStyle={{ fontSize: 15, fontWeight: "700" }}
            onClick={() => navigation.navigate("Followers", { isFollowerPage: true })}
          ></CustomButton>

          <View style={{ width: 83 }}></View>

          <CustomButton
            text="Following"
            style={{ width: 100, borderRadius: 20 }}
            textStyle={{ fontSize: 15, fontWeight: "700" }}
            onClick={() => navigation.navigate("Followers", { isFollowerPage: false })}
          ></CustomButton>
        </View>
        {/* Need for calendar style.
    <View style={{ flexdirection:"row", paddingBottom:30}}>
      
      <TouchableOpacity onPress = {() => navigation.navigate("Calendar")}>
      <View style={styles.calendar} />
      </TouchableOpacity>

    </View>
  */}
        <TouchableOpacity onPress={() => navigation.navigate("Goals")}>
          <GoalSummary></GoalSummary>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  username: {
    paddingTop: 30,
    paddingBottom: 0,
    paddingLeft: 15,
    fontSize: 15,
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
});
