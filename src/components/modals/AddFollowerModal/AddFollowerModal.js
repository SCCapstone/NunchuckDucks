import { View, Modal, StyleSheet, Pressable, Text } from "react-native";
import React, { useState } from "react";
import { createFollower } from "../../../crud/FollowersOperations";
import { createFollowing } from "../../../crud/FollowingOperations";
import { Auth } from "aws-amplify";

import CustomTextInput from "../../CustomTextInput";
import CustomButton from "../../CustomButton";

const AddFollowerModal = ({ modalVisible, setModalVisible }) => {
  const [addFriendValue, setAddFriendValue] = useState("");

  async function addNewFollower() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      let currUser = attributes.preferred_username;
      await createFollower(addFriendValue, currUser);
      await createFollowing(currUser, addFriendValue);
    } catch (err) {
      console.error(err);
    }
    closeModal();
  }

  const closeModal = () => {
    setAddFriendValue("");
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <Pressable
        onPress={closeModal}
        style={styles.transparentView}
      ></Pressable>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Enter a user to follow!</Text>
          <CustomTextInput
            placeholder={"username..."}
            enteredValue={addFriendValue}
            onChangeHandler={(text) => setAddFriendValue(text)}
          ></CustomTextInput>
          <CustomButton
            buttonType={"default"}
            text={"Add Friend"}
            onClick={addNewFollower}
          ></CustomButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "50%",
    backgroundColor: "white",
    minWidth: 220,
    minHeight: 160,
    borderRadius: 15,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  transparentView: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    zIndex: -1,
  },
});

export default AddFollowerModal;
