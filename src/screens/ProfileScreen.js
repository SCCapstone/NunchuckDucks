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
import { DataStore, API, Amplify } from "aws-amplify";
import * as FileSystem from "expo-file-system";
import {
  S3Client,
  GetObjectAttributesCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen(props) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [followercount, setFollowerCount] = useState("");
  const [followingcount, setFollowingCount] = useState("");
  // const [image, setImage] = useState(""); // the image src to be displayed
  const [imageFromAWS, setImageFromAWS] = useState("");
  const [reload, setReload] = useState(false);
  let cacheDirectory = FileSystem.cacheDirectory;
  const cacheImageFileUri = cacheDirectory + "pfp.png";
  const cacheLastModifiedUri = cacheDirectory + "pfpLastModified.txt";
  /*useEffect(() => {
    getUserImageSrc(username)
  }, [username]);*/

  useEffect(() => {
    renderProfileInfo();
  }, []);

  async function renderProfileInfo() {
    await getUsername(); // sets username state
    //console.log(username);
    const imageCached = await getImageFromCache();
    const lastModifiedAWS = await getLastModifiedAWS();

    // we are assuming that if the image exists in client then it should exist in the backend as well
    if (imageCached === true) {
      console.log("Profile pic found in cache");
      const lastModifiedCache = await getLastModifiedCache();
      if (lastModifiedCache !== null) {
        console.log(
          "lastModified same in AWS and cache:",
          lastModifiedAWS === lastModifiedCache
        );
        if (lastModifiedAWS > lastModifiedCache) {
          //lastModifiedAWS has a higher alphabetical order (newer) than lastModifiedCache
          await cacheLastModified(lastModifiedAWS);
        }
      } else {
        // lastModified file not found; creating lastModified file and caching lastModifiedAWS
        await cacheLastModified(lastModifiedAWS);
      }
    } else {
      console.log("Profile pic not found in cache; pulling from AWS");
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      cacheImageFromAWS(username);
    }
  }

  async function cacheLastModified(lastModified) {
    await FileSystem.writeAsStringAsync(cacheLastModifiedUri, lastModified, {
      encoding: "utf8",
    });
  }

  async function getLastModifiedCache() {
    let lastModified = await FileSystem.readAsStringAsync(
      cacheLastModifiedUri,
      { encoding: "utf8" }
    );
    return lastModified;
  }

  async function getLastModifiedAWS() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    let username = attributes.preferred_username;
    let lastModified = null;
    const myInit = {
      queryStringParameters: {
        username: username, // OPTIONAL
      },
    };
    await API.get("getLastModified", "/getLastModified", myInit)
      .then((response) => {
        lastModified = response;
      })
      .catch((error) => {
        console.log("Error: " + error.response);
      });
    return lastModified;
  }
  /*function setLastModifed(lastModified) {

  }*/

  async function findFileInCache(uri) {
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

  async function getImageFromCache() {
    let imageExistsInCache = await findFileInCache(cacheImageFileUri);
    if (imageExistsInCache.exists) {
      setImageFromAWS(cacheImageFileUri);
      console.log("Profile pic exists in cache and will be displayed");
      return true;
    } else {
      return false;
    }
  }

  async function cacheImageFromAWS(username) {
    const uriAWS = await Storage.get(username + "/pfp.png");
    let cached = await cacheImage(uriAWS, cacheImageFileUri);
    if (cached.cached) {
      console.log("cached new pfp.png");
      setImageFromAWS(cached.path);
    } else {
      console.log("Error caching new pfp: ", cached.msg);
    }
  }

  async function getUsername() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      setUsername(username);
      return username;
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
      //const { attributes } = await Auth.currentAuthenticatedUser();
      //let username = attributes.preferred_username;
      const response = await fetch(_image.uri);
      const blob = await response.blob();
      const fileName = username + "/pfp.png";
      //updateProfilePicture(username, fileName);
      await Storage.put(fileName, blob);
      const uriAWS = await Storage.get(username + "/pfp.png");
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
