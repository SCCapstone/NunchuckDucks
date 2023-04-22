import React, { useCallback, useRef } from "react";
import { Image, View, TouchableOpacity, StyleSheet, Touchable, Text, TextInput, Pressable, Button, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import { Auth } from "aws-amplify";
import { createGoal } from "../../crud/GoalOperations";
import { getDate } from "../../library/getDate";
import getPictureFileName from "../../library/getPictureFileName";
import { createPost } from "../../crud/PostOperations";
import ImageSelector from "../../components/ImageSelector";
import { DataStore } from "@aws-amplify/datastore";
import { getCurrentUser } from "../../crud/CacheOperations";
import { getWorkouts } from "../../crud/WorkoutOperations";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import { useNetInfo } from "@react-native-community/netinfo";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import CustomButton from "../CustomButton/CustomButton";
import CreateWorkoutModal from "../modals/CreateWorkoutModal";
import { getNotifications } from "../../crud/NotificationOperations";
import WorkoutSelection from "../WorkoutSelection";
import FastImage from "react-native-fast-image";
import { getAndObserveNotificationCount } from "../../crud/observeQueries/NotificationObserveQueries";
import { Camera, CameraType } from "expo-camera";
import CameraComponent from "../CameraComponent/CameraComponent";

/**
 * Creates the header that will go above the two home screens (Mutual and Explore)
 */
const HomeHeader = ({ handlePress, refresh, setRefresh, blowup, setBlowup }) => {
  const navigation = useNavigation();
  //const [refresh, setRefresh] = useState(true);
  const [text, setText] = useState(""); // the caption you write
  const [workoutSelection, setWorkoutSelection] = useState(null); // array of workouts you selected
  const [image, setImage] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const networkConnection = useNetInfo();
  const [createPostTouched, setCreatePostTouched] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [refreshWorkout, setRefreshWorkout] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [showUploading, setShowUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  Storage.configure();
  const imageSRC = require("../../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png");

  const handleBlowUp = () => {
    setBlowup(!blowup);
    const focusHandler = navigation.addListener("focus", () => {
      setRefresh(!refresh);
    });
  };

  useFocusEffect(
    useCallback(() => {
      setShowCamera(false);
    }, [])
  );

  useEffect(() => {
    const subscription = retrieveNotificationCount();
    return () => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  async function retrieveNotificationCount() {
    try {
      const username = await getCurrentUser();
      const subscription = getAndObserveNotificationCount(username, setNotificationCount);
      return subscription;
    } catch (error) {
      console.error("Retrieving Notification Count in HomeHeader: ", error);
    }
  }

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
  async function savePost() {
    setShowUploading(true);
    //await DataStore.start();
    let username = await getCurrentUser();
    try {
      // try catch just in case sending the image doesn't work
      //const { attributes } = await getCurrentUser();
      var fileName = username + "/" + getPictureFileName();
      await createPost(text, fileName, username, workoutSelection);
      handleBlowUp();
      Toast.show({
        type: "info",
        text1: "Your new post is loading!",
        text2: "It'll show up soon 😄",
        position: "bottom",
        visibilityTime: 3000,
        bottomOffset: 80,
      });
      const response = await fetch(image);
      const blob = await response.blob();
      await Storage.put(fileName, blob);
      setShowUploading(false);
      setText("");
      setWorkoutSelection(null);
      setImage(null);
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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.notiButton}
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Text style={styles.counter}>{notificationCount}</Text>
          <Image style={styles.notification} source={require("../../../assets/icons/Gymbit_Icons_Black/Alert_Icon_Black.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoContainer} onPress={handlePress}>
          <Image style={styles.logo} source={require("../../../assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsButton} onPress={handleCreatePostBlowUp}>
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
              <Pressable onPressOut={handleBlowUp} style={styles.backArrow}>
                <Image source={imageSRC} style={styles.backArrow}></Image>
              </Pressable>
              <View style={styles.header} />
              <View style={{ flexDirection: "row", flex: 1 }}>
                <ImageSelector image={image} setImage={setImage} setShowCamera={setShowCamera} />
                <WorkoutSelection
                  workoutSelection={workoutSelection}
                  setWorkoutSelection={setWorkoutSelection}
                  refreshWorkout={refreshWorkout}
                  setShowCreateWorkout={setShowCreateWorkout}
                  scrollToBottom={scrollToBottom}
                  setScrollToBottom={setScrollToBottom}
                />
              </View>
              <View style={{ alignItems: "center", flex: 2 }}>
                <TextInput style={styles.input} placeholder="Write your caption here" value={text} onChangeText={setText} />
                {showUploading ? (
                  <ActivityIndicator size="large" color="#2E8CFF" />
                ) : (
                  <TouchableOpacity style={styles.submit} onPress={savePost}>
                    <Text style={styles.submitText}>Post Gymbit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {showCamera && <CameraComponent setImage={setImage} setShowCamera={setShowCamera} />}
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
    backgroundColor: "rgba(200,212,225,0.75)",
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

  submitText: {
    color: "white",
    fontSize: 18,
  },

  backArrow: {
    width: 60,
    height: 60,
    paddingBottom: 50,
    alignSelf: "flex-start",
    paddingLeft: 10,
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
