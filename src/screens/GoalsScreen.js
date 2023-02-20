import { View, StyleSheet, ScrollView, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import GoalMini from "../components/GoalMini/GoalMini";
import { getGoals, deleteGoal } from "../crud/GoalOperations";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import React from "react";
import { Storage } from "@aws-amplify/storage";
import { createGoal } from "../crud/GoalOperations";
import { getDate } from "../library/getDate";
import { refresh } from "@react-native-community/netinfo";

Storage.configure();

//Display users goals and allow them to navigate to the create goals screen
export function GoalsScreen() {
  const nav = useNavigation();
  const [goals, setGoals] = useState([]); //set array of all user goals
  const [forceRefresh, setForceRefresh] = useState(true); //refresh the goal list
  const [blowup, setBlowUp] = useState(false);
  const [text, onChangeText] = React.useState(null); //Add text for the goal description

  const handleBlowUp = () => {
    setBlowUp(!blowup);
  }

  async function saveGoal() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    let username = attributes.preferred_username;
    var date = getDate();
    createGoal(username, date, text);
    handleBlowUp();
    setForceRefresh(refresh);
  }

  //retrieve all goals for signed in user
  async function goalList() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    let username = attributes.preferred_username;
    const goals = await getGoals(username);
    setGoals(goals);
  }

  useEffect(() => {
    console.log("refreshing goals screen");
    goalList();
    const focusHandler = nav.addListener("focus", () => {setForceRefresh(!forceRefresh)}) //Refresh page when navigated to
  },[forceRefresh, nav]);
  
  //Generate the list of user goals on the screen
  const listGoals = goals.map((goal) => (
    <GoalMini 
      description = {goal.content}
      key = {goal.id}

      onDeleteHandler={async() => {
        let goalId = goal.id;
        await deleteGoal(goalId);
        setForceRefresh(!forceRefresh);
      }}
    />
  ));

  return (
    <><View>
      <Header title={"Goals"} />

      <View style={styles.container}>
        <CustomButton
          text="Create Goal"
          onClick={handleBlowUp}
          style={styles.button} />
      </View>
    </View>

    <View>
      {blowup ?
      <View style={styles.blowup}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
              }}
              onPress={handleBlowUp}
            >
              <Image
                source={require("../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png")}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Create Goal</Text>
          </View>

          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeText}
              placeholder={"Enter details about your goal"}
              value={text}
            />
            <View style={styles.miniContainer}>
              <CustomButton
                text="Create Goal"
                style={styles.button}
                onClick={saveGoal}
              />
            </View>
          </View>
        </View>
      </View>:<Text></Text>}
    </View>
    
    <ScrollView
      contentContainerStyle={styles.list}
    >
        {listGoals}
    </ScrollView></>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    margin: 20
  },
  lst: {
    alignItems: "center",
    display: "flex",
    backgroundColor: "white",
  },
  textInput: {
    textAlign: "center",
    padding: 10,
    borderBottomColor: "black",
    borderWidth: 1,
    margin: 12,
    borderRadius: 100,
  },
  button: {
    width: 100,
    margin: 10,
  },
  miniContainer: {
    alignItems: "center",
  },
  blowup: {
    width:"100%",
    height: "100%",
    right:0,
    bottom:0,
    top: -50,
    backgroundColor: 'rgba(200,212,225,1)',
    borderRightWidth:0,
    borderLeftWidth:0,
    borderWidth: 2,
    borderTopWidth:3,
    borderRightColor:"black",
  },
  headerContainer: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  headerText: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
  },
})
