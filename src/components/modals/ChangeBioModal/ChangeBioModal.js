import { Modal, Pressable, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { updateBio } from "../../../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../../../library/GetAuthenticatedUser";
import CustomButton from "../../CustomButton";
import CustomTextInput from "../../CustomTextInput";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ChangeBioModal = ({ modalVisible, setModalVisible }) => {
  const [bioValue, setBioValue] = useState(bioValue);

  async function changeBio() {
    const currUser = await getCurrentAuthenticatedUser();
    if (bioValue.length > 500) {
      Toast.show({
        type: "error",
        text1: "Bio can not be more than 500 characters",
        position: "bottom",
        visibilityTime: 3000,
        bottomOffset: 80,
      })
    }
    else 
      await updateBio(currUser, bioValue);
    closeModal();
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <Pressable onPress={closeModal} style={styles.transparentView}></Pressable>
        <View style={styles.modalView}>
          <CustomTextInput
            placeholder={"Write new bio..."}
            enteredValue={bioValue}
            onChangeHandler={(text) => setBioValue(text)}
            maxLength={100}
          ></CustomTextInput>
          <CustomButton buttonType={"default"} text={"Confirm Updated Bio"} onClick={changeBio}></CustomButton>
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
    width: "75%",
    height: "25%",
    backgroundColor: "white",
    //minWidth: 500,
    //minHeight: 250,
    borderRadius: 20,

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

export default ChangeBioModal;
