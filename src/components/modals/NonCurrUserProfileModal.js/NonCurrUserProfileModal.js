import { Modal, StyleSheet, View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { findUserByUsername, isUserPrivate } from "../../../crud/UserOperations";
import ProfileMini from "../../ProfileMini";
import { getFollowsList } from "../../../crud/FollowingOperations";
import { getFollowersList } from "../../../crud/FollowersOperations";
import GoalSummary from "../../GoalSummary";
import { blueThemeColor, grayThemeColor } from "../../../library/constants";
import FastImage from "react-native-fast-image";

const imageSRC = require("../../../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png");

const NonCurrUserProfileModal = ({
  modalVisible,
  setModalVisible,
  username,
  image,
}) => {
  const [user, setUser] = useState("");
  const [followingCount, setFollowingCount] = useState("");
  const [followersCount, setFollowersCount] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    getUserObject(username);
    getFollowingCount(username);
    getFollowersCount(username);
    getIsPrivate();
  }, []);

  async function getIsPrivate() {
    let userPrivacy = await isUserPrivate(username);
    setIsPrivate(userPrivacy);
  }
  const closeModal = () => {
    setModalVisible(false);
  };

  async function getUserObject(username) {
    try {
      const userObj = await findUserByUsername(username);
      if (userObj !== null) {
        setUser(userObj);
      }
    } catch (e) {
      console.log("Error: Could not get user object", e);
    }
  }

  async function getFollowingCount(username) {
    const followingList = await getFollowsList(username);
    if (!followingList || !Array.isArray(followingList)) return;
    setFollowingCount(followingList.length);
  }

  async function getFollowersCount(username) {
    const followersList = await getFollowersList(username);
    if (!followersList || !Array.isArray(followersList)) return;
    setFollowersCount(followersList.length);
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={{ height: "10%" }} />
        <Pressable onPressOut={closeModal} style={styles.backArrow}>
          <Image source={imageSRC} style={styles.backArrow} />
        </Pressable>
        <View
          style={{
            padding: 10,
            backgroundColor: grayThemeColor,
            borderWidth: 2,
            borderRadius: 20,
            alignSelf: "center",
            width: "70%",
            marginTop: "1%",
            marginBottom: "2%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {/*usernameSet && showStreak && (
            <View>
              <Image source={require("../../assets/icons/Gymbit_Icons_Trans/flame.png")} style={styles.flame} />
              <Text style={styles.streak}>{streak}</Text>
            </View>
          )*/}
            <ProfileMini username={username} />
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
                  <Text style={styles.followingNumber}>{followingCount}</Text>
                </View>
                <View style={styles.followingContainer}>
                  <Text style={styles.followingText}>Followers</Text>
                  <Text style={styles.followingNumber}>{followersCount}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{user?.bio ? user.bio : ""}</Text>
          </View>
        </View>
        {isPrivate ? (
          <View style={{ marginTop: "10%", maxWidth: "85%" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>This user has set their goals to be private.</Text>
          </View>
        ) : (
          <GoalSummary username={username} />
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    margin: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  backArrow: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    paddingBottom: 50,
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  username: {
    //paddingTop: 30,
    paddingBottom: 0,

    fontSize: 20,
    fontWeight: "bold",
  },
  followercount: {
    fontSize: 20,
    color: "black",
  },
  bioContainer: {
    marginTop: 5,
    minWidth: "80%",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    minHeight: "auto",
    borderRadius: 10,
    flexDirection: "column",
  },
  bio: {
    paddingTop: 5,
    paddingBottom: 50,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
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
    paddingBottom: 10,
  },
});

export default NonCurrUserProfileModal;
