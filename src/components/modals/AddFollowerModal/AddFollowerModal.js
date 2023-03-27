import { View, Modal, StyleSheet, Pressable, Text } from "react-native";
import React, { useState } from "react";
import { createFollower } from "../../../crud/FollowersOperations";
import { createFollowing } from "../../../crud/FollowingOperations";
import { Auth } from "aws-amplify";

import CustomTextInput from "../../CustomTextInput";
import ErrorModal from "../ErrorModal/ErrorModal";
import CustomButton from "../../CustomButton";
import { getCurrentUser } from "../../../crud/CacheOperations";
import { followerErrorMessage } from "../../../library/constants";

const AddFollowerModal = ({ modalVisible, setModalVisible }) => {
  const [addFriendValue, setAddFriendValue] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  async function addNewFollower() {
    try {
      const currUser = await getCurrentUser();
      const isFollower = await createFollower(addFriendValue, currUser);
      if (!isFollower) {
        setErrorModal(true);
        setAddFriendValue("");
      } else {
        closeModal();
        setAddFriendValue("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const closeModal = () => {
    setAddFriendValue("");
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={closeModal}>
      <Pressable onPress={closeModal} style={styles.transparentView} />
      <View style={styles.centeredView}>
        <ErrorModal
          popUpModalVisible={errorModal}
          setPopUpModalVisible={setErrorModal}
          errorMessage={followerErrorMessage}
          setExternalModal={setModalVisible}
        ></ErrorModal>
        <View style={styles.modalView}>
          <Text>Enter a user to follow!</Text>
          <CustomTextInput
            placeholder={"username..."}
            enteredValue={addFriendValue}
            onChangeHandler={(text) => setAddFriendValue(text)}
          ></CustomTextInput>
          <CustomButton buttonType={"default"} text={"Add Friend"} onClick={addNewFollower}></CustomButton>
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
