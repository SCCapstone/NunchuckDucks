import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import Amplify from "aws-amplify";
import GoalSummary from "../components/GoalSummary";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import React from "react";
import { getFollowsList } from "../crud/FollowingOperations";
import { ImageSelector} from "../components/ImageSelector";
import { getFollowersList } from "../crud/FollowersOperations";
import { findUserByUsername } from "../crud/UserOperations";
import ProfileMini from "../components/ProfileMini";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import SignOutButton from "../components/signoutbutton/SignOutButton";
import * as ImagePicker from "expo-image-picker";


//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen(props) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [followercount, setFollowerCount] = useState("");
  const [followingcount, setFollowingCount] = useState("");
  const [image, setImage] = useState("");
  const [userImageSrc, setUserImageSrc] = useState("");

  useEffect(() => {
    getUserImageSrc(username);
  }, [username, image]);

  const getUserImageSrc = useCallback(async (username) => {
    const user = await findUserByUsername(username);
    if (!user || !user.profilePicture) return;
    setUserImageSrc(user.profilePicture);
  }, []);

  async function getUsername() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      setUsername(username);
    } catch {
      console.error("error getting username");
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

  function getFileName() {
    // used to create a fileName for the image; username/dd--mm-yyyy-timeInMilliseconds
    /*TODO add folder of person's username*/
  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = String(today.getFullYear());
    var time = String(today.getTime());
  
    var name = mm + "-" + dd + "-" + yyyy + "-" + time;
    return name;
  }

    const addImage = async () => {
      let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images /*Only allow image upload */,
        allowsEditing: true /*true= pull up an editing interface after image upload */,
        aspect: [1, 1] /*1:1 image ratio, so it will be a square */,
        quality: 1 /*highest quality image possible, on a scale of 0-1 we want 1 lol */,
      });
      setImage(_image.uri);

      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      var fileName = username + "/" + getFileName();
      const response = await fetch(image);
      const blob = await response.blob();
      Storage.put(fileName, blob);
      
    }

  useEffect(() => {
    getUsername();
    console.log("Username grabbed to display.");
    // getFollowerCount();
    // console.log("Follower Count Grabbed");
    // getFollowingCount();
    // console.log("Following Count Grabbed");
  });

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
        <ProfileMini onClick={() => addImage()} src={userImageSrc}/>
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
        <SignOutButton/>
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
          textStyle={{ fontSize: 15, fontWeight: '700' }}
          onClick={() =>
            navigation.navigate("Followers", { isFollowerPage: true })
          }
        ></CustomButton>

        <View style={{ width: 83 }}></View>

        <CustomButton
          text="Following"
          style={{ width: 100, borderRadius: 20 }}
          textStyle={{ fontSize: 15, fontWeight: '700' }}
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
