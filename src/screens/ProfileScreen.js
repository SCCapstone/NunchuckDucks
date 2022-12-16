import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import GoalSummary from "../components/GoalSummary";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import React from "react";
import { getFollowsList } from "../crud/FollowingOperations";
import { getFollowersList } from "../crud/FollowersOperations";
import { updateProfilePicture } from "../crud/UserOperations";
import { findUserByUsername } from "../crud/UserOperations";
import ProfileMini from "../components/ProfileMini";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import SignOutButton from "../components/signoutbutton/SignOutButton";
import * as ImagePicker from "expo-image-picker";
import { getProfilePicture } from "../crud/UserOperations";
import Storage from "@aws-amplify/storage";
import { DataStore } from "aws-amplify";
import * as FileSystem from "expo-file-system";

//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen(props) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [followercount, setFollowerCount] = useState("");
  const [followingcount, setFollowingCount] = useState("");
  // const [image, setImage] = useState(""); // the image src to be displayed
  const [imageFromAWS, setImageFromAWS] = useState("");
  const [reload, setReload] = useState(false);
  /*useEffect(() => {
    getUserImageSrc(username);
  }, [username]);*/

  useEffect(() => {
    console.log(imageFromAWS);
    getUsernameAndImageSRC();
    //setImage(username + "/pfp.png");

    /*delay(2000);
    console.log("hi");
    setReload(true);*/
    // getFollowerCount();
    // console.log("Follower Count Grabbed");
    // getFollowingCount();
    // console.log("Following Count Grabbed");*/
  }, []);

  async function findImageInCache(uri) {
    try {
      let info = await FileSystem.getInfoAsync(uri);
      return { ...info, err: false };
    } catch (error) {
      return {
        exists: false,
        err: true,
        msg: error,
      };
    }
  }
  async function cacheImage(uri, cacheUri) {
    try {
      const downloadImage = FileSystem.createDownloadResumable(uri, cacheUri);
      const downloaded = await downloadImage.downloadAsync();
      return {
        cached: true,
        err: false,
        path: downloaded.uri,
      };
    } catch (error) {
      return {
        cached: false,
        err: true,
        msg: error,
      };
    }
  }

  async function getUsernameAndImageSRC() {
    await getUsername(); // sets username state
    await getImageSRC();
  }

  const getImageSRC = async () => {
    //downloadBlob(pic.Body, username + "/pfp.png");
    let cacheDirectory = FileSystem.cacheDirectory;
    const cacheFileUri = cacheDirectory + "pfp.png";
    let imageExistsInCache = await findImageInCache(cacheFileUri);
    if (imageExistsInCache.exists) {
      setImageFromAWS(cacheFileUri);
      console.log("Profile pic exists in cache and will be displayed");
    } else {
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      const uriAWS = await Storage.get(username + "/pfp.png");
      let cached = await cacheImage(uriAWS, cacheFileUri);
      if (cached.cached) {
        console.log("cached new pfp.png");
        setImageFromAWS(cached.path);
      } else {
        console.log("Error caching new pfp: ", cached.msg);
      }
    }
  };

  // const getUserImageSrc = useCallback(async (username) => {
  //   /*const user = await findUserByUsername(username);
  //   if (!user || !user.profilePicture) return;*/
  //   const pic = await Storage.get(username + "/pfp.png");
  //   setImageFromAWS(pic);
  // }, []);

  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function getUsername() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      setUsername(username);
    } catch {
      console.error("Error getting username of current authenticated user");
    }
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
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images /*Only allow image upload */,
      allowsEditing: true /*true= pull up an editing interface after image upload */,
      aspect: [1, 1] /*1:1 image ratio, so it will be a square */,
      quality: 1 /*highest quality image possible, on a scale of 0-1 we want 1 lol */,
    });
    // setImage(_image.uri);
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      const response = await fetch(_image.uri);
      const blob = await response.blob();
      const fileName = username + "/pfp.png";
      //updateProfilePicture(username, fileName);
      Storage.put(fileName, blob);
    } catch (error) {
      console.log("Error uploading image to S3", error);
    }
    //updateProfilePicture(username,image);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <View style={{ paddingTop: 25 }}>
        <ProfileMini onClick={() => addProfileImage()} src={imageFromAWS} />
      </View>

      <Text style={styles.username}>@{username}</Text>
      <View style={{ flexDirection: "row", paddingBottom: 15, maxWidth: 250 }}>
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
          onClick={() =>
            navigation.navigate("Followers", { isFollowerPage: true })
          }
        ></CustomButton>

        <View style={{ width: 83 }}></View>

        <CustomButton
          text="Following"
          style={{ width: 100, borderRadius: 20 }}
          textStyle={{ fontSize: 15, fontWeight: "700" }}
          onClick={() =>
            navigation.navigate("Followers", { isFollowerPage: false })
          }
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
  );
}
const styles = StyleSheet.create({
  username: {
    paddingTop: 20,
    paddingBottom: 3,
    fontSize: 22,
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
