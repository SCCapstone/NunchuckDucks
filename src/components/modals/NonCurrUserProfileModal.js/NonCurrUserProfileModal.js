import { Modal, StyleSheet, View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { findUserByUsername } from "../../../crud/UserOperations";
import ProfileMini from "../../ProfileMini";
import { getFollowsList } from "../../../crud/FollowingOperations";
import { getFollowersList } from "../../../crud/FollowersOperations";

const imageSRC = require("../../../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png");

const NonCurrUserProfileModal = ({ modalVisible, setModalVisible, entry, image }) => {
  const [user, setUser] = useState("");
  const [followingCount, setFollowingCount] = useState("");
  const [followersCount, setFollowersCount] = useState("");

  useEffect(() => {
    getUserObject(entry);
    getFollowingCount(entry);
    getFollowersCount(entry);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  async function getUserObject(user) {
    if (user !== null || user.username !== null) {
      try {
        const userObj = await findUserByUsername(user.username);
        if (userObj !== null) {
          setUser(userObj);
        }
      } catch (e) {
        console.log("Error: Could not get user object", e);
      }
    } else {
      console.log("User is equal to null");
    }
  }

  async function getFollowingCount(user) {
    const followingList = await getFollowsList(user.username);
    setFollowingCount(followingList.length);
  }

  async function getFollowersCount(user) {
    const followersList = await getFollowersList(user.username);
    setFollowersCount(followersList.length);
  }

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={closeModal}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          //   justifyContent: "top",
          paddingTop: 100,
        }}
      >
        <Pressable onPressOut={closeModal} style={styles.backArrow}>
          <Image source={imageSRC} style={styles.backArrow}></Image>
        </Pressable>
        <View
          style={{
            paddingTop: 0,
            paddingBottom: 10,
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <ProfileMini onClick={closeModal} src={image} />
          <Text style={styles.username}>@{user.username !== null ? user.username : ""}</Text>
        </View>
        <View style={styles.followingContainer}>
          <Text style={styles.followingText}>Following</Text>
          <Text style={styles.followingText}>{followingCount}</Text>
        </View>
        <View style={styles.followingContainer}>
          <Text style={styles.followingText}>Followers</Text>
          <Text style={styles.followingText}>{followersCount}</Text>
        </View>
        <Text style={styles.bioText}>Bio</Text>
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>{user.bio !== null ? user.bio : ""}</Text>
        </View>
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
    alignSelf: "left",
    paddingLeft: 10
  },
  username: {
    paddingTop: 30,
    paddingBottom: 0,
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  followercount: {
    fontSize: 20,
    color: "black",
  },
  bioContainer: {
    width: 310,
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
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    minHeight: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
  followingText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  bioText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default NonCurrUserProfileModal;
