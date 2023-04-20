import { View, Text, TouchableOpacity, StyleSheet, Switch, TextInput, ToastAndroid } from "react-native";
import Header from "../components/Header/Header";
import { getPostsThatShouldBeCached, getAllCachedFiles, deleteCachedFile, getCurrentUser } from "../crud/CacheOperations";
import { isUserPrivate, togglePrivacy, getWeeklyGoal, setWeeklyGoal } from "../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import InfoModal from "../components/modals/InfoModal";
import { Toast } from "react-native-toast-message/lib/src/Toast.js";
import ChangeGoalModal from "../components/modals/ChangeGoalModal/ChangeGoalModal";
import SignOutButton from "../components/signoutbutton/SignOutButton";

export function SettingsScreen() {
  const styles = StyleSheet.create({
    deleteCacheButton: {
      height: 40,
      backgroundColor: "#2E8CFF",
      color: "#GG1342",
      width: 150,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      display: "flex",
      height: "100%",
      backgroundColor: "white",
    },
    textInput: {
      textAlign: "center",
    },
    goalContainer: {
      borderColor: "black",
      borderWidth: 2,
      textAlign: "center",
      padding: 10,
      left: 10,
      width: "93%",
    },
    goalText: {
      padding: 20,
      fontWeight: "bold",
      fontSize: 15,
    },
    goalButton: {
      backgroundColor: blueThemeColor,
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
      width: 180,
      top: 15,
      borderRadius: 50,
      padding: 10,
    },
  });

  const [username, setUsername] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [privacy, setPrivacy] = useState(null);
  const [goal, setGoal] = useState(null);
  const [text, setText] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Enter new weekly workout goal here");
  const [forceRefresh, setForceRefresh] = useState(true);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("test");
  const [GoalModalVisible, setGoalModalVisible] = useState(false);

  useEffect(() => {
    renderSettings();
  }, [GoalModalVisible]);

  const toggleSwitch = async () => {
    await togglePrivacy(username, !privacy);
    setPrivacy(!privacy);
    setIsEnabled(!isEnabled);
    /*if (privacy === true) {
      await togglePrivacy(username, false);
      // setIsEnabled((previousState) => false);
      setPrivacy(false);
    } else {
      await togglePrivacy(username, true);
      // setIsEnabled((previousState) => true);
      setPrivacy(true);
    }*/
  };

  const showModal = (message) => {
    setModalVisible(true);
    setMessage(message);
  };

  const showGoalModal = () => {
    setModalVisible(true);
    //saveNewGoal();
  }

  async function renderSettings() {
    let username = await getCurrentUser();

    let privacy = await isUserPrivate(username);
    if (privacy === true) {
      setIsEnabled(true);
    }
    setPrivacy(privacy);
    const weeklyGoal = await getWeeklyGoal(username);
    console.log("Weekly goal", weeklyGoal);
    setGoal(weeklyGoal);
    setText(null);
    setUsername(username);
  }

  // async function saveNewGoal() {
  //   let number = parseInt(text, 10);

  //   if (text.length > 1 || !Number.isInteger(number)) {
  //     setText("");
  //     Toast.show({
  //       type: "error",
  //       text1: "Please enter a number 1-7",
  //       position: "bottom",
  //       visibilityTime: 3000,
  //       bottomOffset: 80,
  //     });
  //   } else {
  //     let confirm = await setWeeklyGoal(username, number);
  //     if (confirm !== null) {
  //       setGoal(text);
  //     }
  //   }
  // }

  return (
    <View style={styles.container}>
      <Header title={"Settings"} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <InfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} message={message}></InfoModal>
        <ChangeGoalModal modalVisible={GoalModalVisible} setModalVisible={setGoalModalVisible} />
        <Text style={styles.goalText}>Toggle privacy</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
        <TouchableOpacity
          onPress={() =>
            showModal(
              "Setting your account to private will disable other users from seeing your personal goals when they view your account."
            )
          }
        >
          <Text style={{ fontSize: 12, color: "gray", paddingLeft: 10 }}>more info</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <Text style={styles.goalText}>Your current weekly workout goal is {goal}.</Text>
      <TouchableOpacity
          onPress={() =>
            showModal(
              "Your weekly goal will keep track of how many times per week you would like to work out.  We track your goal progress through the number of posts that you have made in the past week.\nIf you meet your goal for a week your streak will inscrease on your profile."
            )
          }
        >
          <Text style={{ fontSize: 12, color: "gray" }}>more info</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", alignContent: "center" }}>
        <TouchableOpacity style={styles.goalButton} onPress={() => setGoalModalVisible(true)}>
          <Text style={{ textAlign: "center", color: "white" }}>Change weekly goal</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignContent: "center", alignItems: "center", top: "47%"}}>
        <SignOutButton />
      </View>

    </View>
  );
}
