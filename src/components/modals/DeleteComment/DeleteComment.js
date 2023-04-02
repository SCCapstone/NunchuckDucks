import React from "react";
import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { deleteComment } from "../../../crud/CommentOperations";
import CustomButton from "../../CustomButton";

const DeleteComment = ({
    modalVisible,
    setModalVisible,
    commentID
}) => {

    const closeModal = () => {
        setModalVisible(false);
    };

    async function commentDelete(commentId) {
        await deleteComment(commentId);
        closeModal();
    }
    

    return (
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={closeModal}>
            <Pressable onPress={closeModal} style={styles.transparentView}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Delete Comment?</Text>
                        <CustomButton buttonType={"default"} text={"Confirm"} onClick= {() => commentDelete(commentID)}></CustomButton>
                        <CustomButton buttonType={"default"} text={"Cancel"} onClick={() => closeModal()}></CustomButton>
                    </View>
                </View> 
            </Pressable>
        </Modal>
    )
}

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

export default DeleteComment;