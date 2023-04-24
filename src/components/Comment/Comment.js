import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
import { Storage } from "@aws-amplify/storage";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import {
  checkForDeletability,
  createComment,
  deleteComment,
} from "../../crud/CommentOperations";
import { getCurrentUser, getImageFromCache } from "../../crud/CacheOperations";
import NonCurrUserProfileModal from "../modals/NonCurrUserProfileModal.js/NonCurrUserProfileModal";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
import ConfirmDelete from "../modals/ConfirmDelete";
import ErrorModal from "../modals/ErrorModal/ErrorModal";
import { useNavigation } from "@react-navigation/native";
import { getUserId } from "../../crud/UserOperations";

const OptionsButton = require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png");

const Comment = ({ commentModel, postID, replies, style, refresh }) => {
  const navigation = useNavigation();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(false);
  const errorMessage = "You do not have permission to delete this comment.";

  const replyUI = replies
    ?.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    })
    .map((val) => {
      return <Comment commentModel={val} postID={postID} key={val.id} />;
    });

    useEffect(() => {
      showDelete(postID, commentModel?.username);
    });

  const showRepliesButton = (
    <CustomButton
      buttonType={"hyperlink"}
      isUnderlined={true}
      isSelected={true}
      text={repliesOpen ? "Hide Replies" : "Show Replies"}
      onClick={() => setRepliesOpen(!repliesOpen)}
      textStyle={{ color: blueThemeColor, textAlign: "left" }}
    ></CustomButton>
  );

  async function checkIfDeletable(postID, username, commentId) {
    if (await checkForDeletability(postID, username)) {
      setCommentModalVisible(true);
    } else setErrorModalVisible(true);
  }

  async function showDelete(postID, username) {
    if (await checkForDeletability(postID, username)) {
      setShow(true);
    }
    else  setShow(false);
  }

  async function handleUserClick() {
    try {
      if (commentModel.username === (await getCurrentUser())) {
        navigation.navigate("Profile");
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onReplySubmit() {
    setReplyOpen(false);
    // Call CRUD to make new datastore object
    try {
      const replyID = commentModel.reply ? commentModel.reply : commentModel.id;
      const username = await getCurrentUser();
      createComment(replyText, username, postID, replyID);
    } catch (error) {
      console.error("Comment: ", error);
    }
    // Add "fake" offline comment to comments to maintain UX
    // Will need to be replaced with watching datastore at some point
    setReplyText("");
  }

  return (
    <View style={{ ...styles.container, ...style }}>
      <NonCurrUserProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        username={commentModel?.username}
      ></NonCurrUserProfileModal>
      <ConfirmDelete
        modalVisible={commentModalVisible}
        setModalVisible={setCommentModalVisible}
        id={commentModel.id}
        text={"Delete Comment?"}
        deletefunc={deleteComment}
      ></ConfirmDelete>
      <ErrorModal
        popUpModalVisible={errorModalVisible}
        setPopUpModalVisible={setErrorModalVisible}
        errorMessage={errorMessage}
        setExternalModal={setCommentModalVisible}
      ></ErrorModal>
      <ProfileMini
        username={commentModel.username}
        refresh={refresh}
        onClick={() => handleUserClick()}
        style={styles.leftSide}
      />
      <View style={styles.rightSide}>
        <View style={styles.userNameAndDots}>
          <Text style={styles.username} onPress={() => handleUserClick()}>
            {commentModel?.username}
          </Text>
          {show &&
          <TouchableOpacity
            onPress={() => checkIfDeletable(postID, commentModel?.username,commentModel?.id)}
          >
            <Image style={styles.deleteButton} source={OptionsButton}></Image>
          </TouchableOpacity>
          }
        </View>

        <Text style={styles.content}>{commentModel?.content}</Text>
        <CustomButton
          buttonType={"hyperlink"}
          isUnderlined={false}
          isSelected={false}
          onClick={() => {
            setReplyOpen(!replyOpen);
          }}
          text={"Reply"}
          style={{ width: "15%", minWidth: 40 }}
          textStyle={{ textAlign: "left" }}
        />
        {replyOpen && (
          <CustomTextInput
            onChangeHandler={setReplyText}
            enteredValue={replyText}
            placeholder={"Reply..."}
            customStyles={{
              width: "90%",
              maxWidth: "90%",
              marginTop: 5,
              marginBottom: 5,
            }}
            multiline={true}
            maxLength={250}
          />
        )}
        {replyOpen && <CustomButton onClick={onReplySubmit} text={"Submit"} />}
        {replyOpen && replyText.length < 250 && <Text style={{fontSize: 12, color: "gray"}}>{replyText.length}/250</Text>}
        {replyOpen && replyText.length === 250 && <Text style={{fontSize: 12, color: "red"}}>{replyText.length}/250</Text>}
        {!commentModel.reply && replies?.length > 0 && showRepliesButton}
        {repliesOpen && replyUI}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {},
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",

    width: "100%",
    padding: 5,
  },

  rightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minWidth: "60%",
    maxWidth: "70%",

    marginLeft: 5,
  },
  leftSide: {
    maxWidth: "30%",
  },
  username: {
    color: blueThemeColor,
  },
  content: {
    maxWidth: "90%",
  },
  reply: {
    width: "90%",
  },
  deleteButton: {
    flex: 1,
    width: 30,
    height: 30,
    backgroundColor: grayThemeColor,
    opacity: 0.6,
    resizeMode: "center",
  },
  userNameAndDots: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Comment;
