import { Modal, Pressable, View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { updateBio } from "../../../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../../../library/GetAuthenticatedUser";
import CustomButton from "../../CustomButton";
import CustomTextInput from "../../CustomTextInput";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ChangeBioModal = ({ modalVisible, setModalVisible, testID }) => {
  const [bioValue, setBioValue] = useState("");

  async function changeBio() {
    const currUser = await getCurrentAuthenticatedUser();
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
            testID={`${testID}.Text_Input`}
          ></CustomTextInput>
          {bioValue.length < 100 && <Text style={{fontSize: 14, color: "gray"}}>{bioValue.length}/100</Text>}
          {bioValue.length === 100 && <Text style={{fontSize: 14, color: "red"}}>{bioValue.length}/100</Text>}
          <CustomButton buttonType={"default"} text={"Confirm Updated Bio"} onClick={changeBio} testID={`${testID}.Confirm_Button`}></CustomButton>
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
    minHeight: 150,
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
