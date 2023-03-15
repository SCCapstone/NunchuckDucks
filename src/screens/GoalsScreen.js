import { View, StyleSheet, ScrollView, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import GoalMini from "../components/GoalMini/GoalMini";
import CompletedGoalMini from "../components/CompletedGoalMini";
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
  const [incompletegoals, setIncompleteGoals] = useState([]);
  const [completegoals, setCompleteGoals] = useState([]);//set array of all user goals
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
    setForceRefresh(!forceRefresh);
  }

  //retrieve all goals for signed in user
  async function goalList() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    let username = attributes.preferred_username;
    //if checkcompleted is true -> add to this comp list of goals, else uncomp list
    const goals = await getGoals(username);
    tempincgoals=[];
    tempcompgoals=[];
    for(let i = 0; i<goals.length;i++)
    {
      console.log('Goal',i,' is:', goals[2].isComplete);
      if(goals[i].isComplete === false || goals[i].isComplete === null)
      {
        tempincgoals.push(goals[i]);
        console.log('This ran blank times:',i ,'GoalT/F val:',goals[i].isComplete);
        console.log('This is 1st if',tempincgoals[i].isComplete)
        //tempincgoals.push.apply(tempincgoals,goals[i]);
        //tempincgoals =  tempincgoals.concat(goals[i]);
      }
      else if(goals[i].isComplete === true)
      {
        tempcompgoals.push(goals[i]);
        console.log('This ran blank times:',i ,'GoalT/F val:',goals[i].isComplete);
        //tempcompgoals.push.apply(goals[i]);
        console.log('This is 2rd else',tempcompgoals[i].isComplete);
      }
      else{
        tempincgoals.push(goals[i]);
        console.log('This ran blank times:',i ,'GoalT/F val:',goals[i].isComplete);
        console.log('This is 3rd else',tempincgoals[i].isComplete);
      }
    }
    setCompleteGoals(tempcompgoals);
    setIncompleteGoals(tempincgoals);
  }

  useEffect(() => {
    console.log("refreshing goals screen");
    goalList();
    const focusHandler = nav.addListener("focus", () => {setForceRefresh(!forceRefresh)}) //Refresh page when navigated to
  },[forceRefresh, nav]);
  
  //Generate the list of user goals on the screen
  const incompleteListGoals = incompletegoals.map((goal) => 
  (
    <GoalMini 
      description = {goal.content}
      key = {goal.id}
      onCompleteHandler={
        async() => {
          let goaltf = goal.isComplete
          console.log('we are hereeeeee baby!!! goal is getting set?:', goaltf)
          goal.isComplete = true;
          let goalaf = goal.isComplete
          console.log('we are hereeeeee baby!!! goal is getting set?:', goalaf)
          setForceRefresh(!forceRefresh);
      }}
      onDeleteHandler={async() => {
        let goalId = goal.id;
        await deleteGoal(goalId);
        setForceRefresh(!forceRefresh);
      }}
    />
  ));

  const completedListGoals = completegoals.map((goal) => (
    <CompletedGoalMini 
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
        {incompleteListGoals}
    </ScrollView>
    
    <View style={styles.container}>
        <CustomButton
          text="Completed Goals"
          //Onclick could be added if needed.
          style={styles.button2} />
      </View>

    <ScrollView
      contentContainerStyle={styles.list}
    >
        {completedListGoals}
    </ScrollView>
    </>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    margin: 20,
    width:"auto"
  },
  button2:{
    margin:20,
    width:"auto"
  },
  list: {
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
    fontSize: 22,
    position: "absolute",
    left: 0,
    top: 50,//to move it down and center with back button
    zIndex: -1,
  },
})
