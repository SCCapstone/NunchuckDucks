import { View, Text, TouchableOpacity, StyleSheet, Switch, TextInput } from "react-native";
import Header from "../components/Header/Header";
import { getPostsThatShouldBeCached, getAllCachedFiles, deleteCachedFile, getCurrentUser } from "../crud/CacheOperations";
import { isUserPrivate, togglePrivacy, getWeeklyGoal, setWeeklyGoal } from "../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { blueThemeColor, grayThemeColor } from "../library/constants";

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
    text: {
      top: 33,
      left: 20,
    },
    switch: {
      right: 175,
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
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 15,
    },
    goalButton: {
      backgroundColor: blueThemeColor,
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
      width: 180,
      left: 85,
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

  useEffect(() => {
    renderSettings();
  }, []);

  const toggleSwitch = async () => {
    await togglePrivacy(username, !privacy);
    setPrivacy(!privacy);
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

  async function saveNewGoal() {
    let number = parseInt(text);
    let confirm = await setWeeklyGoal(username, parseInt(text));
    if (confirm !== null) {
      setGoal(text);
    }
  }

  return (
    <View style={styles.container}>
      <Header title={"Settings"} />
      <Text style={styles.text}>Toggle privacy</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
      <Text style={styles.goalText}>Your current weekly workout goal is {goal}. Change goal below</Text>
      <View style={styles.goalContainer}>
        <TextInput style={styles.textInput} placeholder={"Current Goal: " + goal} value={text} onChangeText={setText} />
      </View>
      <TouchableOpacity style={styles.goalButton} onPress={saveNewGoal}>
        <Text style={{ textAlign: "center", color: "white" }}>Change weekly goal</Text>
      </TouchableOpacity>
    </View>
  );
}
