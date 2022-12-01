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

//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen(props) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [followercount, setFollowerCount] = useState("");
  const [followingcount, setFollowingCount] = useState("");
  const [image, setImage] = useState(""); // the image src to be displayed
  const [imageFromAWS, setImageFromAWS] = useState("");

  /*useEffect(() => {
    getUserImageSrc(username);
  }, [username]);*/

  useEffect(() => {
    getUsername(); // sets username state

    //setImage(username + "/pfp.png");
    getUserImageSrc(username); // sets image src
    console.log("Username grabbed to display.");
    // getFollowerCount();
    // console.log("Follower Count Grabbed");
    // getFollowingCount();
    // console.log("Following Count Grabbed");
  }, []);

  const getUserImageSrc = useCallback(async (username) => {
    const user = await findUserByUsername(username);
    if (!user || !user.profilePicture) return;
    setImageFromAWS(user.profilePicture);
  }, []);

  async function getUsername() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      setUsername(username);
    } catch {
      console.error("Error getting username of current authenticated user");
    }
  }

  async function getFollowerCount() {
    const followercoun = await getFollowersList(username);
    setFollowerCount(followercoun.length);
  }

  async function getFollowingCount() {
    const followingcoun = await getFollowsList(username);
    setFollowingCount(followingcoun.length);
  }

  const addProfileImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images /*Only allow image upload */,
      allowsEditing: true /*true= pull up an editing interface after image upload */,
      aspect: [1, 1] /*1:1 image ratio, so it will be a square */,
      quality: 1 /*highest quality image possible, on a scale of 0-1 we want 1 lol */,
    });
    setImage(_image.uri);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const fileName = username + "/pfp.png";
      console.log(fileName);
      Storage.put(fileName, blob);
    } catch {
      console.log("Error uploading image to S3");
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
