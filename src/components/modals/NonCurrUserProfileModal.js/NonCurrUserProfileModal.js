import { Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { findUserByUsername } from "../../../crud/UserOperations";

const NonCurrUserProfileModal = ({modalVisible, setModalVisible, entry}) => {
    const [user, setUser] = useState("");

    useEffect(() => {
        getUserObject(entry);
    })
    
    const closeModal = () => {
        setModalVisible(false);
    };

    async function getUserObject(user) {
        const userObj = await findUserByUsername(user.username);
        setUser(userObj);
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
                style={styles.transparentView}>
            </Pressable>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>{user.username}</Text>
                    <Text>{user.bio}</Text>
                    <TouchableOpacity onPress={closeModal}>
                    <Image source={require("../../../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png")}></Image>
                    </TouchableOpacity>
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

export default NonCurrUserProfileModal;