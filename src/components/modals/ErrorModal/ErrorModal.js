import { View, Modal, StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../CustomButton";

const ErrorModal = ({popUpModalVisible, setPopUpModalVisible, errorMessage, setExternalModal}) => {
    const errorMessageText = errorMessage;
    const closeModal = () => {
        setExternalModal(false);
        setPopUpModalVisible(false);
    };

    return (
        <Modal visible={popUpModalVisible} animationType="fade" transparent={true} onRequestClose={closeModal}>
            <Pressable onPress={closeModal} style={styles.transparentView}></Pressable>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>{errorMessageText}</Text>
                    <CustomButton buttonType={"default"} text={"OK"} onClick={() => closeModal()}></CustomButton>
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

export default ErrorModal;