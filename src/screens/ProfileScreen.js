import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import Amplify from "aws-amplify";
import GoalSummary from "../components/GoalSummary";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import React from "react";
import { getFollowsList } from "../crud/FollowingOperations";
import { getFollowersList } from "../crud/FollowersOperations";
import ProfileMini from "../components/ProfileMini";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen(props) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [followercount, setFollowerCount] = useState("");
  const [followingcount, setFollowingCount] = useState("");

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
        <ProfileMini></ProfileMini>
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
          textStyle={{ fontSize: 15 }}
          onClick={() =>
            navigation.navigate("Followers", { isFollowerPage: true })
          }
        ></CustomButton>

        <View style={{ width: 83 }}></View>

        <CustomButton
          text="Following"
          style={{ width: 100, borderRadius: 20 }}
          textStyle={{ fontSize: 15 }}
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
