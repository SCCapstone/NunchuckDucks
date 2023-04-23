import { Image, View, TouchableOpacity, StyleSheet, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import getPictureFileName from "../../library/getPictureFileName";
import { createPost } from "../../crud/PostOperations";
import ImageSelector from "../../components/ImageSelector";
import { getCurrentUser } from "../../crud/CacheOperations";
import { blueThemeColor } from "../../library/constants";
import { useNetInfo } from "@react-native-community/netinfo";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import CreateWorkoutModal from "../modals/CreateWorkoutModal";
import WorkoutSelection from "../WorkoutSelection";
import { getAndObserveNotificationCount } from "../../crud/observeQueries/NotificationObserveQueries";
import { AntDesign } from "@expo/vector-icons";
import { NotificationsScreen } from "../../screens/NotificationsScreen";
import { grayThemeColor } from "../../library/constants";
import { getNotifications } from "../../crud/NotificationOperations";

/**
 * Creates the header that will go above the two home screens (Mutual and Explore)
 */
const HomeHeader = ({ handlePress, refresh, setRefresh, blowup, setBlowup, testID }) => {
  const navigation = useNavigation();
  //const [refresh, setRefresh] = useState(true);
  const [text, setText] = useState(""); // the caption you write
  const [workoutSelection, setWorkoutSelection] = useState(null); // array of workouts you selected
  const [image, setImage] = useState(null);
  const [retrieveNotificationCount, setRetrieveNotificationCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const networkConnection = useNetInfo();
  const [createPostTouched, setCreatePostTouched] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [refreshWorkout, setRefreshWorkout] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [showUploading, setShowUploading] = useState(false);
  const [error, setError] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  Storage.configure();
  const imageSRC = require("../../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png");

  const handleBlowUp = () => {
    setBlowup(!blowup);
    const focusHandler = navigation.addListener("focus", () => {
      setRefresh(!refresh);
    });
  };

  async function subscribeToNotificationCount() {
    try {
      const username = await getCurrentUser();
      const subscription = await getAndObserveNotificationCount(username, setRetrieveNotificationCount);
      return subscription;
    } catch (error) {
      console.error("Retrieving Notification Count in HomeHeader: ", error);
    }
  }

  async function updateNotificationCount() {
    try {
      const username = await getCurrentUser();
      const notifications = await getNotifications(username);
      setNotificationCount(notifications.length);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    updateNotificationCount();
  }, [retrieveNotificationCount]);

  useEffect(() => {
    const subscription = subscribeToNotificationCount();
    return () => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  const handleCreatePostBlowUp = () => {
    if (networkConnection.isConnected) {
      setBlowup(!blowup);
    } else {
      setCreatePostTouched(!createPostTouched);
    }
  };

  const showPostUploadedToast = () => {
    Toast.show({
      type: "success",
      text1: "Successfully uploaded your new post!",
      //text2: "Go check it out on your mutuals page 🔥",
      position: "bottom",
      visibilityTime: 6000,
      bottomOffset: 80,
    });
  };
  const showPostNotUploadedToast = (usr) => {
    if (usr === "") {
      usr = "friend";
    }
    Toast.show({
      type: "error",
      text1: "Uh oh, there was trouble uploading your post...",
      text2: "Try again later. Sorry, " + usr + " 😔",
      position: "bottom",
      visibilityTime: 6000,
      bottomOffset: 80,
    });
  };
  const showNetworkNotConnectedToast = () => {
    Toast.show({
      type: "error",
      text1: "No network connection detected.",
      text2: "Can't create a post.",
      position: "bottom",
      visibilityTime: 4000,
      bottomOffset: 80,
    });
  };

  async function attemptToCreatePost() {
    if (!image) {
      setError("Posts require an Image");
      return;
    }
    savePost();
  }

  async function savePost() {
    setShowUploading(true);
    //await DataStore.start();
    let username = await getCurrentUser();
    try {
      // try catch just in case sending the image doesn't work
      //const { attributes } = await getCurrentUser();
      var fileName = username + "/" + getPictureFileName();
      await createPost(text, fileName, username, workoutSelection);
      const copyImage = image;
      handleBlowUp();
      setShowUploading(false);
      setText("");
      setWorkoutSelection(null);
      setImage(null);
      setError("");
      Toast.show({
        type: "info",
        text1: "Your new post is loading!",
        text2: "It'll show up soon 😄",
        position: "bottom",
        visibilityTime: 3000,
        bottomOffset: 80,
      });
      const response = await fetch(copyImage);
      const blob = await response.blob();
      await Storage.put(fileName, blob);
      showPostUploadedToast();
    } catch (error) {
      showPostNotUploadedToast(username);
      console.error("Error uploading file", error);
    }
    setRefresh(!refresh);
  }

  useEffect(() => {
    if (networkConnection.isConnected === false) {
      showNetworkNotConnectedToast();
    }
  }, [createPostTouched]);

  return (
    <>
      <View style={styles.container} testID={testID}>
        <TouchableOpacity
          style={styles.notiButton}
          onPress={() => {
            setShowNotifications(true);
          }}
          testID={`${testID}.Notifications_Button`}
        >
          <Text style={styles.counter}>{notificationCount}</Text>
          <Image style={styles.notification} source={require("../../../assets/icons/Gymbit_Icons_Black/Alert_Icon_Black.png")} />
        </TouchableOpacity>
        {showNotifications && <NotificationsScreen setShowNotifications={setShowNotifications} />}
        <TouchableOpacity style={styles.logoContainer} onPress={handlePress}>
          <Image style={styles.logo} source={require("../../../assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={handleCreatePostBlowUp} testID={`${testID}.Create_Post_Button`}>
          <Image style={styles.settings} source={require("../../../assets/icons/Gymbit_Icons_Black/Create_Post_Icon_Black.png")} />
        </TouchableOpacity>
      </View>
      <View>
        {blowup && (
          <View style={styles.blowup}>
            <View></View>
            {showCreateWorkout && (
              <CreateWorkoutModal
                modalVisible={showCreateWorkout}
                setModalVisible={setShowCreateWorkout}
                refreshWorkouts={refreshWorkout}
                setRefreshWorkouts={setRefreshWorkout}
                scrollToBottom={scrollToBottom}
                setScrollToBottom={setScrollToBottom}
                setWorkoutSelection={setWorkoutSelection}
              />
            )}
            <View style={{ flex: 1 }}>
              <Pressable onPressOut={handleBlowUp} style={styles.backArrow} testID={`${testID}.Create_Post_Back_Button`}>
                <AntDesign name="arrowleft" size={40} style={styles.backArrow} />
              </Pressable>
              <View style={styles.header} />
              <View style={{ flexDirection: "row", flex: 1 }}>
                <ImageSelector image={image} setImage={setImage} />
                <WorkoutSelection
                  workoutSelection={workoutSelection}
                  setWorkoutSelection={setWorkoutSelection}
                  refreshWorkout={refreshWorkout}
                  setShowCreateWorkout={setShowCreateWorkout}
                  scrollToBottom={scrollToBottom}
                  setScrollToBottom={setScrollToBottom}
                  testID={`${testID}.Workout_Selection`}
                />
              </View>
              <View style={{ alignItems: "center", flex: 2 }}>
                {text.length < 500 && <Text style={{ fontSize: 14, color: "gray", paddingTop: 10 }}>{text.length}/500</Text>}
                {text.length === 500 && <Text style={{ fontSize: 14, color: "red", paddingTop: 10 }}>{text.length}/500</Text>}
                <TextInput
                  style={styles.input}
                  placeholder="Write your caption here"
                  value={text}
                  onChangeText={setText}
                  maxLength={500}
                  testID={`${testID}.Create_Post_Caption`}
                  multiline={true}
                />
                {showUploading ? (
                  <ActivityIndicator size="large" color="#2E8CFF" />
                ) : (               
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={attemptToCreatePost}
                    testID={`${testID}.Create_Post_Submit`}
                  >
                    <Text style={styles.submitText}>Post Gymbit</Text>
                  </TouchableOpacity>
                )}
                {!showUploading && error && <Text style={styles.error}>{error}</Text>}
                {!showUploading && !error && <Text style={styles.error}> </Text>}
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    //height: "10%",
  },
  container: {
    width: "100%",
    height: 100,
    //alignItems: "center",
    paddingTop: 38,
    backgroundColor: "white",
    flexDirection: "row",
  },

  notiButton: {
    width: 50,
    height: 50,
    flex: 1,
    paddingLeft: 15,
  },

  notification: {
    width: 50,
    height: 50,
  },

  logoContainer: {
    alignItems: "center",
    width: 100,
    height: 50,
    flex: 1,
  },

  logo: {
    width: 100,
    height: 110,
    aspectRatio: 1,
  },

  settingsButton: {
    width: 50,
    height: 50,
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 15,
  },

  settings: {
    width: 50,
    height: 50,
  },

  blowup: {
    width: "100%",
    height: "100%",
    right: 0,
    bottom: 0,
    backgroundColor: grayThemeColor,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 2,
    borderTopWidth: 3,
    borderRightColor: "black",
  },

  input: {
    height: 150,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  submit: {
    height: 40,
    backgroundColor: "#2E8CFF",
    color: "#GG1342",
    width: 150,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  submitButtonContainer: {},

  error: {
    color: "red",
    fontSize: 11,
    minHeight: 20,
    textAlign: "center",
  },

  submitText: {
    color: "white",
    fontSize: 18,
  },

  backArrow: {
    alignSelf: "flex-start",
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    //backgroundColor: "rgba(200,212,225,0.75)",
  },
  counter: {
    borderRadius: 100,
    color: "#FFFFFF",
    backgroundColor: blueThemeColor,
    width: 20,
    textAlign: "center",
    height: 20,
    textAlignVertical: "center",
    position: "absolute",
    zIndex: 5,
    left: 42,
    top: 10,
  },
});

export default HomeHeader;
