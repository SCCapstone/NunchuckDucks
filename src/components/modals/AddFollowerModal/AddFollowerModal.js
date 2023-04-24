import { View, Modal, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { createFollower } from "../../../crud/FollowersOperations";

import CustomTextInput from "../../CustomTextInput";
import ErrorModal from "../ErrorModal/ErrorModal";
import CustomButton from "../../CustomButton";
import { getCurrentUser } from "../../../crud/CacheOperations";
import { followerErrorMessage } from "../../../library/constants";
import { getUsersbyStartofUsername } from "../../../crud/UserOperations";
import SuggestedFollower from "../../SuggestedFollower";

const AddFollowerModal = ({ modalVisible, setModalVisible, testID }) => {
  const [addFriendValue, setAddFriendValue] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const renderedSuggestedUsers = suggestedUsers.map((suggestedUser) => (
    <SuggestedFollower username={suggestedUser.username} addNewFollower={addNewFollower} key={suggestedUser.id} testID={testID}></SuggestedFollower>
  ));

  async function addNewFollower(desiredFollowValue) {
    try {
      const currUser = await getCurrentUser();
      const isFollower = await createFollower(desiredFollowValue, currUser);
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
    setSuggestedUsers([]);
    setModalVisible(false);
  };

  // Using this to reset suggestedFollowers every time the modal is opened or closed
  // Simpler codewise than doing it in closeModal and reworking ErorrModal but will leave some tech debt
  useEffect(() => {
    setSuggestedUsers([]);
    setAddFriendValue("");
  }, [modalVisible]);

  useEffect(() => {
    let isDeprecated = false;
    if (!addFriendValue) {
      setSuggestedUsers([]);
      return () => (isDeprecated = true);
    }
    const fetchUsers = async () => {
      const users = await getUsersbyStartofUsername(addFriendValue);
      if (!isDeprecated) {
        setSuggestedUsers(users);
      }
    };
    fetchUsers();

    return () => (isDeprecated = true);
  }, [addFriendValue]);

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => closeModal}>
      <View style={styles.centeredView}>
        <Pressable onPress={closeModal} style={styles.transparentView} />
        <ErrorModal
          popUpModalVisible={errorModal}
          setPopUpModalVisible={setErrorModal}
          errorMessage={followerErrorMessage}
          setExternalModal={setModalVisible}
        ></ErrorModal>
        <View style={styles.modalView}>
          <Text>Enter a user to follow!</Text>
          <View style={styles.lowerThird}>
            <CustomTextInput
              placeholder={"username..."}
              enteredValue={addFriendValue}
              onChangeHandler={(text) => setAddFriendValue(text)}
              customStyles={{ width: "45%" }}
              testID={`${testID}.Search_Bar`}
            ></CustomTextInput>
            <CustomButton
              buttonType={"default"}
              text={"Follow"}
              onClick={addNewFollower.bind(this, addFriendValue)}
              style={{ width: "35%" }}
            ></CustomButton>
          </View>
          {suggestedUsers.length === 0 && <Text style={styles.noSuggestedUsers}>No Suggested Users</Text>}
          {suggestedUsers.length !== 0 && (
            <ScrollView style={styles.suggestionsInner} contentContainerStyle={{ flexGrow: 1 }}>
              {renderedSuggestedUsers}
            </ScrollView>
          )}
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
    width: "65%",
    backgroundColor: "white",
    minWidth: 220,
    minHeight: 260,
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
  lowerThird: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  suggestions: {
    // position: "absolute",
    // height: 250,
    // bottom: -230,
    // left: 0,
    // flex: 1,
  },
  suggestionsInner: {
    // position: "absolute",
    // left: 0,
    // bottom: -100,
    // flex: 1,
    width: "100%",

    // zIndex: 2,
    height: 170,
    maxHeight: 170,
  },
  noSuggestedUsers: {
    height: 170,
  },
});

export default AddFollowerModal;
