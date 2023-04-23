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
import CustomButton from "../components/CustomButton/CustomButton";

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
      width: 220,
      //top: 15,
      borderRadius: 50,
      margin: 10,
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

  // useEffect(() => {
  //   checkPrivacy();
  // })

  const toggleSwitch = async () => {
    setIsEnabled(!isEnabled);
    await togglePrivacy(username, !privacy);
    setPrivacy(!privacy);
  };

  const showModal = (message) => {
    setModalVisible(true);
    setMessage(message);
  };

  const showGoalModal = () => {
    setModalVisible(true);
  };

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

  async function checkPrivacy() {
    let username = await getCurrentUser();

    let privacy = await isUserPrivate(username);
    if (privacy === true)
      setIsEnabled(true);
    setPrivacy(privacy);
  }

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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.goalText}>Your current weekly workout goal is {goal}.</Text>
        <TouchableOpacity
          onPress={() =>
            showModal(
              "Your weekly goal will keep track of how many times per week you would like to work out.  We track your goal progress through the number of posts that you have made in the past week.\nIf you meet your goal for a week, your streak will increase on your profile."
            )
          }
        >
          <Text style={{ fontSize: 12, color: "gray" }}>more info</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", alignContent: "center" }}>
        <CustomButton text="Change weekly goal" onClick={() => setGoalModalVisible(true)} />
        {/*<TouchableOpacity style={styles.goalButton} onPress={() => setGoalModalVisible(true)}>
          <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>Change weekly goal</Text>
        </TouchableOpacity>*/}
      </View>
      <View style={{ alignContent: "center", alignItems: "center", marginTop: 30 }}>
        <SignOutButton />
      </View>
    </View>
  );
}
