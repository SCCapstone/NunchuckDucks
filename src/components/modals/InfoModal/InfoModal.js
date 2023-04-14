import { View, Modal, StyleSheet, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

const AddFollowerModal = ({ modalVisible, setModalVisible, message }) => {

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <Pressable onPress={closeModal} style={styles.transparentView} />
        <View style={styles.modalView}>
            <Text>{message}</Text>
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
    //minHeight: 150,
    borderRadius: 15,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",

    padding: 15,
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