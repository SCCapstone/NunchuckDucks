import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import Reactions from "../Reactions";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
import { useNavigation } from "@react-navigation/native";
import NonCurrUserProfileModal from "../modals/NonCurrUserProfileModal.js/NonCurrUserProfileModal";
import Comment from "../Comment";
import { createComment, getComments } from "../../crud/CommentOperations";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";

export default function Post(props) {
  const entry = props.entry;
  const refresh = props.refresh;
  const [picture, setPicture] = useState(null);
  const [pfp, setPfp] = useState("");
  const [blowup, setBlowup] = useState(false);
  const [modalVisible, setModalVisible] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState(new Map());
  const [shortCommentDisplay, setShortCommentDisplay] = useState(true);
  const [showCommentOption, setCommentOption] = useState(false);
  const [commentText, setCommentText] = useState("");
  const navigation = useNavigation();

  const handleBlowUp = () => {
    setBlowup(!blowup);
  };

  const commentList = comments.map((val) => {
    return (
      <Comment
        key={val.id}
        postID={entry.id}
        commentModel={val}
        replies={replies.get(val.id)}
      />
    );
  });

  async function getPic() {
    // TODO retrieve post picture from the passed entry fileName
    const pic = await Storage.get(entry.photo);
    setPicture(pic);
    try {
      const pfps3 = await Storage.get(entry.username + "/pfp.png");
      setPfp(pfps3);
    } catch (error) {
      console.log("Error retrieving pfp: " + error);
    }
  }

  async function onCommentSubmit() {
    setCommentOption(false);
    // Call CRUD to make new datastore object
    try {
      const username = await getCurrentAuthenticatedUser();
      createComment(commentText, username, entry.id, null);
    } catch (error) {
      console.error("Comment: ", error);
    }
    // Add "fake" offline comment to comments to maintain UX
    // Will need to be replaced with watching datastore at some point
    setCommentText("");
  }

  async function retrieveComments() {
    try {
      const modelComments = await getComments(entry.id);
      const topLevelComments = modelComments.filter((val) => !val.reply);
      const replies = modelComments.filter((val) => val.reply);
      const replyMap = new Map();
      replies.forEach((val) => {
        if (replyMap.has(val.reply)) {
          const replyArrayForOneComment = replyMap.get(val.reply);
          replyArrayForOneComment.push(val);
        } else {
          replyMap.set(val.reply, [val]);
        }
      });
      setComments(topLevelComments);
      setReplies(replyMap);
    } catch (error) {
      console.error("Retrieving Comments in Post: ", error);
    }
  }

  // get the pic again after a refresh
  useEffect(() => {
    getPic();
    setBlowup(false);
    retrieveComments();
  }, [refresh, modalVisible]);

  return (
    <View style={styles.postBox}>
      <NonCurrUserProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        entry={entry}
        image={pfp}
      ></NonCurrUserProfileModal>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <ProfileMini
          src={pfp}
          style={{ height: 42, width: 42, marginLeft: 6, marginRight: 6 }}
          imageStyle={{ height: 42, width: 42 }}
          onClick={() => setModalVisible(true)}
        />
        {/*Need to make it navigate to users specific profile*/}
        <Text style={styles.postUsername} onPress={() => setModalVisible(true)}>
          {entry.username}
        </Text>
        <Text style={styles.createdAt}>{getTimeElapsed(entry.createdAt)}</Text>
      </View>
      <Pressable
        onPress={handleBlowUp}
        style={{
          backgroundColor: "rgba(30,144,255,0.5)",
          height: "78%",
          bottom: -20,
          marginTop: -20,
        }}
      >
        <Image source={{ uri: picture }} style={{ height: 400 }} />
      </Pressable>
      <View>
        {blowup ? (
          <View style={styles.blowupmain}>
            <View style={styles.blowupheader}>
              <Text style={styles.blowupheader}>Today's Workout</Text>
            </View>
            <View>
              <Text style={styles.blowupbody}>- {entry.caption}</Text>
            </View>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
      {/*replace get time elapsed w/ actual on click utility*/}
      {/*<View style={styles.captionBox} /> Need to implement caption box as intended*/}
      <View name="Footer" style={styles.footer}>
        <Text>{entry.caption}</Text>
        <Reactions
          postID={entry.id}
          commentsClicked={showCommentOption}
          setCommentsClicked={setCommentOption}
        />
        {showCommentOption && (
          <CustomTextInput
            onChangeHandler={setCommentText}
            enteredValue={commentText}
            placeholder={"Comment..."}
            customStyles={{
              width: "90%",
              maxWidth: "90%",
              marginTop: 5,
              marginBottom: 5,
            }}
            multiline={true}
          />
        )}
        {showCommentOption && (
          <CustomButton onClick={onCommentSubmit} text={"Submit"} />
        )}
        {shortCommentDisplay ? commentList.slice(0, 2) : commentList}
        {comments.length > 2 && shortCommentDisplay && (
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            onClick={() => setShortCommentDisplay(false)}
            text={"Show More"}
            style={{ paddingBottom: 10 }}
          ></CustomButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    color: "green",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 20,
  },
  captionBox: {},
  postHeader: {
    height: "10%",
    flex: 1,
    //width: "100%",
    alignItems: "center",
    //justifyContent: "flex-start",
    backgroundColor: grayThemeColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  postUsername: {
    /* #3C8DD9 */
    color: "#2E8CFF",
    fontWeight: "bold",
    fontSize: 28,
  },
  footer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: grayThemeColor,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  createdAt: {
    marginLeft: "auto", // gives 95% of margin to the left of createdAt
    marginRight: "5%", // effectively pushing it to the right
  },
  blowupmain: {
    width: "100%",
    height: 250,
    marginTop: 20,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(200,212,225,0.7)",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 2,
    borderTopWidth: 3,
    borderRightColor: "black",
  },
  blowupheader: {
    height: 53,
    borderColor: "black",
    color: blueThemeColor,
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
    borderBottomWidth: 3,
  },
  blowupbody: {
    fontSize: 21,
    textAlign: "left",
    paddingLeft: 20,
    marginTop: 5,
  },
});

function getTimeElapsed(createdAt) {
  var ans = ""; // the output
  if (createdAt == undefined) {
    // Checks that createdAt exists
    // Will not exist when DataStore is not connected to remote
    return ans;
  }
  var createdAtFormatted = createdAt.substring(0, 19); //gets rid of a few milliseconds to make it proper format
  var currDate = new Date(); // current date and time in UTC
  var dateUploaded = new Date(createdAtFormatted); // date and time of upload in UTC

  // Both dates are already in UTC, this just gets the time difference
  var diff = currDate.getTime() - dateUploaded.getTime();
  var minutesDifference = diff / (1000 * 60);
  var hoursDifference = Math.floor(minutesDifference / 60);
  var daysDifference = Math.floor(hoursDifference / 24);
  var monthsDifference = Math.floor(daysDifference / 30);
  var yearsDifference = Math.floor(monthsDifference / 12);

  if (minutesDifference < 1) {
    ans = "less than a minute ago";
  } else if (minutesDifference <= 60) {
    ans = Math.round(minutesDifference.toString()) + " minutes ago";
  } else if (hoursDifference <= 24) {
    ans = Math.round(hoursDifference.toString()) + " hours ago";
  } else if (daysDifference <= 30) {
    ans = Math.round(daysDifference.toString()) + " days ago";
  } else if (monthsDifference <= 12) {
    ans = Math.round(monthsDifference.toString()) + " months ago";
  } else {
    ans = Math.round(yearsDifference.toString()) + " years ago";
  }
  return ans;
}
