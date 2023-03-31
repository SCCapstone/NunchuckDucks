import { Image, View, TouchableOpacity, StyleSheet, Touchable, Text, TextInput, ScrollView, Pressable } from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
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

/**
 * Creates the header that will go above the two home screens (Mutual and Explore)
 */
const HomeHeader = ({ handlePress }) => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);
  const [blowup, setBlowup] = useState(false);
  const [text, setText] = useState(""); // the caption you write
  const [workoutSelection, setWorkoutSelection] = useState(null); // array of workouts you selected
  const [image, setImage] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const networkConnection = useNetInfo();
  const [createPostTouched, setCreatePostTouched] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [refreshWorkout, setRefreshWorkout] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);

  Storage.configure();
  const imageSRC = require("../../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png");

  const handleBlowUp = () => {
    setBlowup(!blowup);
    const focusHandler = nav.addListener("focus", () => {
      setRefresh(!refresh);
    });
  };

  async function findNotificationCount() {
    const username = await getCurrentUser();
    let notifications = await getNotifications(username);
    setNotificationCount(notifications.length);
  }

  const handleCreatePostBlowUp = () => {
    if (networkConnection.isConnected) {
      setBlowup(!blowup);
    } else {
      setCreatePostTouched(!createPostTouched);
    }
  };

  useEffect(() => {
    findNotificationCount();
  }, [navigation]);

  const showPostUploadedToast = () => {
    Toast.show({
      type: "success",
      text1: "Successfully uploaded your new post!",
      text2: "Go check it out on your mutuals page 🔥",
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
    //await DataStore.start();
    let username = await getCurrentUser();
    try {
      // try catch just in case sending the image doesn't work
      //const { attributes } = await getCurrentUser();
      var fileName = username + "/" + getPictureFileName();
      const response = await fetch(image);
      const blob = await response.blob();
      await createPost(text, fileName, username, workoutSelection);
      await Storage.put(fileName, blob);
      showPostUploadedToast();
    } catch (error) {
      showPostNotUploadedToast(username);
      console.error("Error uploading file", error);
    }
    handleBlowUp();
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
                />
              </View>
              <View style={{ alignItems: "center", flex: 2 }}>
                <TextInput style={styles.input} placeholder="Write your caption here" value={text} onChangeText={setText} />
                <TouchableOpacity style={styles.submit} onPress={savePost}>
                  <Text style={styles.submitText}>Post Gymbit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

/*function CreatePost() {
  if (networkConnection.isConnected)

}*/

function WorkoutSelection({
  workoutSelection,
  setWorkoutSelection,
  refreshWorkout,
  setShowCreateWorkout,
  scrollToBottom,
  setScrollToBottom,
}) {
  const scrollviewRef = useRef();
  useEffect(() => {
    console.log("CURR workoutSele", workoutSelection);
    getWorkoutList();

    doStuff();
  }, [refreshWorkout]);
  const [workouts, setWorkouts] = useState([]);
  async function getWorkoutList() {
    let username = await getCurrentUser();
    let workouts = await getWorkouts(username);
    setWorkouts(workouts);
  }
  async function doStuff() {
    if (scrollToBottom === true) {
      //ScrollView.scrollToEnd
      //setWorkoutSelection(workouts[workouts.length - 1]);
      console.log("halllo", workouts);
      setWorkoutSelection(workouts[workouts.length - 1]);
      scrollviewRef.current.scrollToEnd();
      setScrollToBottom(false);
    }
  }
  function handleWorkoutSelectionPress(workout) {
    setWorkoutSelection(workout);
  }
  function handleSelectedWorkoutPress() {
    setWorkoutSelection(null);
  }
  return (
    <View style={styles.workoutSelectionContainer}>
      <View style={styles.what}>
        <Text style={{ color: "white", fontSize: 14 }}>What workout did you do today?</Text>
      </View>
      <ScrollView ref={scrollviewRef} contentContainerStyle={styles.workoutMainContainer} style={{ width: "100%", flex: 1 }}>
        <TouchableOpacity id={-1} onPress={() => setShowCreateWorkout(true)} style={styles.workoutSelection}>
          <Text style={{ color: blueThemeColor, fontWeight: "bold" }}>Create new workout</Text>
        </TouchableOpacity>
        {workouts.map((workout, index) => {
          if (workout === workoutSelection) {
            console.log("THEY EQUAL EACH OTHER", workout);
            // This will console.log successfully after creating a new workout, but won't return this. Will figure out later.
            return (
              <TouchableOpacity id={index} onPress={() => handleSelectedWorkoutPress(workout)} style={styles.workoutSelectionHighlighted}>
                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{workout.workoutName}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity id={index} onPress={() => handleWorkoutSelectionPress(workout)} style={styles.workoutSelection}>
                <Text style={{ color: blueThemeColor, fontWeight: "bold" }}>{workout.workoutName}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    paddingTop: 30,
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
    height: 100,
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

  workoutSelectionContainer: {
    borderWidth: 3,
    borderLeftWidth: 0,
    alignItems: "center",
    flex: 1,
  },
  workoutMainContainer: {
    alignItems: "center",

    width: "100%",
  },

  what: {
    backgroundColor: "#2E8CFF",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  workoutSelection: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
  },
  workoutSelectionHighlighted: {
    backgroundColor: blueThemeColor,
    //overlayColor: blueThemeColor,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
  },
  backArrow: {
    width: 60,
    height: 60,
    paddingBottom: 50,
    alignSelf: "flex-start",
    paddingLeft: 10,
    backgroundColor: "rgba(200,212,225,0.75)",
  },
  counter: {
    borderRadius: 100,
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
  backArrow: {
    width: 60,
    height: 60,
    paddingBottom: 50,
    alignSelf: "flex-start",
    paddingLeft: 10,
    backgroundColor: "rgba(200,212,225,0.75)",
  },
  counter: {
    borderRadius: 100,
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
