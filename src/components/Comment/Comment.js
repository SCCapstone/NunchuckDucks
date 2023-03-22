import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
import { Storage } from "@aws-amplify/storage";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { createComment } from "../../crud/CommentOperations";
import { getCurrentUser } from "../../crud/CacheOperations";

const Comment = ({ commentModel, postID, replies, style, refresh }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [repliesOpen, setRepliesOpen] = useState(false);

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

  useEffect(() => {
    //getPic();
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
      <ProfileMini username={commentModel.username} refresh={refresh} />
      <View style={styles.rightSide}>
        <Text style={styles.username}>{commentModel?.username}</Text>
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
});

export default Comment;
