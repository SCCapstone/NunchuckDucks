import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import Reactions from "../Reactions";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "../../crud/CacheOperations";
import { useNetInfo } from "@react-native-community/netinfo";
import NonCurrUserProfileModal from "../modals/NonCurrUserProfileModal.js/NonCurrUserProfileModal";
import Comment from "../Comment";
import { createComment, getComments } from "../../crud/CommentOperations";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CachedImage from "../CachedImage/CachedImage";
import Workout from "../Workout/Workout";
import { getWorkoutById } from "../../crud/WorkoutOperations";
import { getAndObserveComments } from "../../crud/observeQueries/CommentObserveQueries";
import { getUriFromCache, cacheRemoteUri } from "../../crud/CacheOperations";
import FastImage from "react-native-fast-image";

export default function Post(props) {
  const entry = props.entry;
  const username = entry.username;
  const refresh = props.refresh;
  const photoStr = entry.photo;
  const workoutId = entry.postWorkoutId;
  const picName = photoStr.substring(photoStr.indexOf("/") + 1);
  const [picture, setPicture] = useState(null);
  const [pfp, setPfp] = useState("");
  const [blowup, setBlowup] = useState(false);
  const navigation = useNavigation();
  const networkConnection = useNetInfo();
  const [modalVisible, setModalVisible] = useState("");
  const [retrieveComments, setRetrieveComments] = useState(0);
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState(new Map());
  const [shortCommentDisplay, setShortCommentDisplay] = useState(true);
  const [showCommentOption, setCommentOption] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [hasWorkout, setHasWorkout] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [uriIsSet, setUriIsSet] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handleBlowUp = () => {
    setBlowup(!blowup);
  };

  let commentList = comments.map((val) => {
    return (
      <Comment
        key={val.id}
        postID={entry.id}
        commentModel={val}
        replies={replies.get(val.id)}
      />
    );
  });

  async function onCommentSubmit() {
    setCommentOption(false);
    // Call CRUD to make new datastore object
    try {
      const comenterName = await getCurrentUser();
      await createComment(commentText, comenterName, entry.id, null);
    } catch (error) {
      console.error("Error: Could not create comment", error);
    }
    setCommentText("");
  }

  async function observeComments() {
    try {
      const subscription = await getAndObserveComments(
        entry.id,
        setRetrieveComments
      );
      return subscription;
    } catch (error) {
      console.error("Retrieving Comments in Post: ", error);
    }
  }

  async function handleUserClick(username) {
    try {
      if (username === (await getCurrentUser())) {
        navigation.navigate("Profile");
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setImageFromCacheOrAWS();
    const subscription = observeComments();
    return () => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    };
  }, [refresh]);

  useEffect(() => {
    const updateAllComments = async () => {
      try {
        const comments = await getComments(entry.id);
        setAllComments(comments);
      } catch (error) {
        console.error("Retrieving Comments in Post: ", error);
      }
    };
    updateAllComments().catch((err) => console.error(err));
    return () => {};
  }, [retrieveComments]);

  useEffect(() => {
    const topLevelComments = allComments.filter((val) => !val.reply);
    const replies = allComments.filter((val) => val.reply);
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
  }, [allComments]);

  useEffect(() => {
    getWorkoutForPost();
  }, []);

  async function setImageFromCacheOrAWS() {
    let uriFromCache = await getUriFromCache(username, picName);
    if (uriFromCache === "") {
      uriFromCache = await cacheRemoteUri(username, picName);
    }
    setImageUri(uriFromCache);
    setUriIsSet(true);
  }

  async function getWorkoutForPost() {
    if (workoutId !== undefined && workoutId !== null) {
      let workout = await getWorkoutById(workoutId);
      setWorkout(workout);
      setHasWorkout(true);
    }
  }
  return (
    <View style={styles.postBox}>
      <NonCurrUserProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        username={username}
        picName={picName}
      ></NonCurrUserProfileModal>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <ProfileMini
          username={username}
          refresh={refresh}
          style={{ height: 42, width: 42, marginLeft: 6, marginRight: 6 }}
          imageStyle={{ height: 42, width: 42 }}
          onClick={() => handleUserClick(username)}
        />
        {/*Need to make it navigate to users specific profile*/}
        <Text
          style={styles.postUsername}
          onPress={() => handleUserClick(username)}
        >
          {username}
        </Text>
        <Text style={styles.createdAt}>{getTimeElapsed(entry.createdAt)}</Text>
      </View>
      <Pressable
        onPress={handleBlowUp}
        style={{
          backgroundColor: "rgba(30,144,255,0.5)",
          position: "relative",
        }}
      >
        {uriIsSet ? (
          <FastImage
            source={{
              uri: imageUri,
              headers: {},
              priority: FastImage.priority.normal,
            }}
            style={{ height: 400 }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View
            style={{
              height: 400,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: grayThemeColor,
            }}
          >
            <ActivityIndicator size="large" color="#2E8CFF" />
          </View>
        )}
        {blowup && hasWorkout && (
          <Workout workout={workout} isAbsolute={true} />
        )}
      </Pressable>
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
        {comments.length > 2 && (
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            onClick={() => setShortCommentDisplay(!shortCommentDisplay)}
            text={`Show ${shortCommentDisplay ? "More" : "Less"}`}
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
    alignItems: "center",
    backgroundColor: grayThemeColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  postUsername: {
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
    height: 400,
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

export function getTimeElapsed(createdAt) {
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
    ans = Math.round(minutesDifference.toString()) + ` minute${Math.floor(minutesDifference) === 1 ? "" : "s"} ago`;
  } else if (hoursDifference <= 24) {
    ans = Math.round(hoursDifference.toString()) + ` hour${Math.floor(hoursDifference) === 1 ? "" : "s"} ago`;
  } else if (daysDifference <= 30) {
    ans = Math.round(daysDifference.toString()) + ` day${Math.floor(daysDifference) === 1 ? "" : "s"} ago`;
  } else if (monthsDifference === 1) {
    ans = "1 month ago";
  } else if (monthsDifference <= 12) {
    ans = Math.round(monthsDifference.toString()) + ` month${Math.floor(monthsDifference) === 1 ? "" : "s"} ago`;
  } else {
    ans = Math.round(yearsDifference.toString()) + ` year${Math.floor(yearsDifference) === 1 ? "" : "s"} ago`;
    }
  return ans;
}
