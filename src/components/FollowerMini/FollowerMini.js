import { Pressable, Image, StyleSheet, View, Text } from "react-native";
import ProfileMini from "../ProfileMini";
import { grayThemeColor, blueThemeColor } from "../../library/constants";
import { findUserByUsername } from "../../crud/UserOperations";
import { useState, useEffect, useCallback } from "react";
import { getImageFromCache } from "../../crud/CacheOperations";
import { Storage } from "aws-amplify";
import NonCurrUserProfileModal from "../modals/NonCurrUserProfileModal.js/NonCurrUserProfileModal";
import { AntDesign } from "@expo/vector-icons";
import ConfirmDelete from "../modals/ConfirmDelete/ConfirmDelete";

const deleteIconPath = require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png");

const FollowerMini = ({ username, onDelete, style, isFollowerPage, testID }) => {
  const containerStyles = { ...styles.container, ...style };
  const [modalVisible, setModalVisible] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <View style={containerStyles}>
      <NonCurrUserProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible} username={username}></NonCurrUserProfileModal>
      <ConfirmDelete
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        text={`${
          isFollowerPage
            ? `Are you sure you want ${username} to stop following you?`
            : `Are you sure you want to stop following ${username}?`
        }`}
        deletefunc={onDelete}
        testID={`${testID}.Confirm_Delete`}
      ></ConfirmDelete>
      <View style={styles.leftSideContainer}>
        <ProfileMini username={username} onClick={() => setModalVisible(true)} />
        <Pressable onPressOut={() => setModalVisible(true)} style={styles.usernameContainer}>
          <Text style={styles.username}>@{username}</Text>
        </Pressable>
      </View>
      <Pressable onPressOut={() => setDeleteModalVisible(true)} testID={`${testID}.Delete`}>
        <AntDesign name="close" size={40} />
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
    paddingLeft: 10,
    width: "100%",
  },
  xIcon: {
    width: 60,
    height: 60,
  },
});

export default FollowerMini;
