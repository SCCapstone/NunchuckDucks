import { Modal, Pressable, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { getCurrentAuthenticatedUser } from "../../../library/GetAuthenticatedUser";
import CustomButton from "../../CustomButton";
import CustomTextInput from "../../CustomTextInput";
import { setWeeklyGoal } from "../../../crud/UserOperations";
import SignOutButton from "../../signoutbutton/SignOutButton";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ChangeGoalModal = ({ modalVisible, setModalVisible }) => {
  const [goalValue, setGoalValue] = useState("");

  async function changeGoal() {
    const currUser = await getCurrentAuthenticatedUser();

    let number = parseInt(goalValue, 10);

    // if ((goalValue.length > 1 || !Number.isInteger(number)) && number <= 7 && number >= 1) 
    if (!Number.isInteger(number) || number > 7 || number < 1) {
        setGoalValue("");
        Toast.show({
          type: "error",
          text1: "Please enter a number 1-7",
          position: "bottom",
          visibilityTime: 3000,
          bottomOffset: 80,
        });
    } 
    else {
        await setWeeklyGoal(currUser, goalValue);
    }
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
            placeholder={"Write new weekly goal..."}
            enteredValue={goalValue}
            onChangeHandler={(text) => setGoalValue(text)}
          ></CustomTextInput>
          <CustomButton buttonType={"default"} text={"Confirm Updated Weekly Goal"} onClick={changeGoal}></CustomButton>
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
    minWidth: 500,
    minHeight: 250,
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

export default ChangeGoalModal;