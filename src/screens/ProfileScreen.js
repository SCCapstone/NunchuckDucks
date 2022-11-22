import { View, Text, StyleSheet, Image } from "react-native";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "aws-amplify";
import SignOutButton from "../components/signoutbutton/SignOutButton";
import GoalSummary from "../components/GoalSummary";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import React from "react";
import ProfileMini from "../components/ProfileMini";
import CustomButton from "../components/CustomButton";
import { Header } from "react-native/Libraries/NewAppScreen";

//Need to also create the buttons to be clickable and call different functions
export function ProfileScreen({ username }) {
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

      <Text style={styles.username}>@{username}Example</Text>

      <View style={{ flexDirection: "row", paddingBottom: 15, maxWidth: 250 }}>
        <CustomButton text="Add Friend +"></CustomButton>
      </View>

      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Text style={styles.followercount}>74</Text>
        <View style={{ width: 157 }}></View>
        <Text style={styles.followercount}>86</Text>
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
          textStyle={{ fontSize: 15 }}
        ></CustomButton>
        <View style={{ width: 60 }}></View>
        <CustomButton
          text="Following"
          textStyle={{ fontSize: 15 }}
        ></CustomButton>
      </View>
      <View style={{ flexDirection: "row", paddingBottom: 30 }}>
        <View style={styles.calendar} />
      </View>

      <GoalSummary></GoalSummary>
    </View>
  );
}
const styles = StyleSheet.create({
  username: {
    paddingTop: 20,
    paddingBottom: 3,
    fontSize: 18,
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
    width: "70%",
    height: 180,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: blueThemeColor,
    backgroundColor: grayThemeColor,
  },
});
