import { Pressable, Image, StyleSheet, View, Text } from "react-native";
import ProfileMini from "../ProfileMini";
import { grayThemeColor } from "../../library/constants";
import { findUserByUsername } from "../../crud/UserOperations";
import { useState, useEffect, useCallback } from "react";
import { getImageFromCache } from "../../crud/CacheOperations";
import { Storage } from "aws-amplify";
import NonCurrUserProfileModal from "../modals/NonCurrUserProfileModal.js/NonCurrUserProfileModal";

const deleteIconPath = require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png");

const FollowerMini = ({ username, onProfileClick, onDelete, style }) => {
  const containerStyles = { ...styles.container, ...style };
  const [userImageSrc, setUserImageSrc] = useState("");
  const [modalVisible, setModalVisible] = useState("");

  useEffect(() => {
    getUserImageSrc(username);
  }, [username]);

  async function getUserImageSrc(username) {
    let pfp = await getImageFromCache(username, "pfp.png");
    if (pfp === "") {
      pfp = await Storage.get(username + "/pfp.png");
    }
    setUserImageSrc(pfp);
  }

  async function closeModal() {
    setModalVisible(false);
  }
  /*const getUserImageSrc = useCallback(async (username) => {
    const user = await findUserByUsername(username);
    if (!user || !user.profilePicture) return;
    setUserImageSrc(user.profilePicture);
  }, []);*/

  return (
    <View style={containerStyles}>
      <NonCurrUserProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        username={username}
        image={userImageSrc}
      ></NonCurrUserProfileModal>
      <View style={styles.leftSideContainer}>
        <ProfileMini username={username} onClick={() => setModalVisible(true)} />
        <Pressable onPressOut={() => setModalVisible(true)} style={styles.usernameContainer}>
          <Text style={styles.username}>@{username}</Text>
        </Pressable>
      </View>
      <Pressable onPressOut={onDelete}>
        <Image source={deleteIconPath} resizeMode={"center"} style={styles.xIcon}></Image>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: grayThemeColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",

    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  leftSideContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "80%",
  },
  usernameContainer: {
    maxWidth: "80%",
  },
  username: {
    textAlignVertical: "center",
    fontSize: 20,
    padding: 5,
    width: "100%",
  },
  xIcon: {
    width: 60,
    height: 60,
  },
});

export default FollowerMini;
