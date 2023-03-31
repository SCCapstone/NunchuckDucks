import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
import { Storage } from "@aws-amplify/storage";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { checkForDeletability, createComment } from "../../crud/CommentOperations";
import { getCurrentUser, getImageFromCache } from "../../crud/CacheOperations";
import NonCurrUserProfileModal from "../modals/NonCurrUserProfileModal.js/NonCurrUserProfileModal";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
import DeleteComment from "../modals/DeleteComment";
import ErrorModal from "../modals/ErrorModal/ErrorModal";

const OptionsButton = require("../../../assets/icons/Gymbit_Icons_Black/Three_Dots_Black.png");

const Comment = ({ commentModel, postID, replies, style }) => {
  const [pfp, setPfp] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible]  = useState(false);
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
      return <Comment commentModel={val} postID={postID} key={val.id} style={{ width: "90%", alignSelf: "flex-start" }} />;
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

  async function getPic() {
    try {
      let pfps3 = await getImageFromCache(commentModel.username, "pfp.png");
      if (pfps3 === "") {
        pfps3 = await Storage.get(commentModel.username + "/pfp.png");
      }
      //const pfps3 = await Storage.get(commentModel.username + "/pfp.png");
      setPfp(pfps3);
    } catch (error) {
      console.log("Error retrieving pfp in comment: " + error);
    }
  }

  async function checkIfDeletable(postID, username) {

    if (await checkForDeletability(postID, username))
      {
        setCommentModalVisible(true);
      }
    else
      setErrorModalVisible(true);
  }

  useEffect(() => {
    getPic();
  }, []);

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
      image={pfp}></NonCurrUserProfileModal>
      <DeleteComment
      modalVisible={commentModalVisible}
      setModalVisible={setCommentModalVisible}
      commentID={commentModel.id}>
      </DeleteComment>
      <ErrorModal
      popUpModalVisible={errorModalVisible}
      setPopUpModalVisible={setErrorModalVisible}
      errorMessage={errorMessage}
      setExternalModal={setCommentModalVisible}
      ></ErrorModal>
      <ProfileMini src={pfp} onClick={() => setModalVisible(true)}></ProfileMini>
      <View style={styles.rightSide}>
        <Text style={styles.username} onPress={() => setModalVisible(true)}>{commentModel?.username}</Text>
        <View style={styles.threeDotsContainer}>
        <TouchableOpacity onPress={() => checkIfDeletable(postID, commentModel?.username)}>
          <Image style={styles.deleteButton} source={OptionsButton}></Image>
        </TouchableOpacity>
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
          />
        )}
        {replyOpen && <CustomButton onClick={onReplySubmit} text={"Submit"} />}
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

    width: "90%",
    padding: 5,
    backgroundColor: grayThemeColor, // To be removed
  },

  rightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minWidth: "60%",

    marginLeft: 5,

    // backgroundColor: "purple",
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
  threeDotsContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row"
  },
  deleteButton: {
    flex: 1,
    width: 30,
    height: 30,
    backgroundColor: grayThemeColor,
    opacity: 0.6,
    resizeMode: "center",
    marginLeft: 250,
  }
});

export default Comment;
