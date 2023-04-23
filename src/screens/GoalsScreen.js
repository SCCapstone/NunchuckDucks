import {View,StyleSheet,ScrollView,Text,TextInput,Image,TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import GoalMini from "../components/GoalMini/GoalMini";
import CompletedGoalMini from "../components/CompletedGoalMini";
import { getGoals, deleteGoal, updateGoal } from "../crud/GoalOperations";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { Storage } from "@aws-amplify/storage";
import { createGoal } from "../crud/GoalOperations";
import { getDate } from "../library/getDate";
import { getCurrentUser } from "../crud/CacheOperations";

Storage.configure();

//Display users goals and allow them to navigate to the create goals screen
export function GoalsScreen({ route }) {
  const { isCompletedPage } = route.params;
  const nav = useNavigation();
  const goalRef = useRef(null);
  const [incompletegoals, setIncompleteGoals] = useState([]);
  const [completegoals, setCompleteGoals] = useState([]); //set array of all user goals
  const [forceRefresh, setForceRefresh] = useState(true); //refresh the goal list
  const [blowup, setBlowUp] = useState(false);
  const [text, onChangeText] = useState(null); //Add text for the goal description

  const handleBlowUp = () => {
    setBlowUp(!blowup);
  };

  async function saveGoal() {
    const username = await getCurrentUser();
    var date = getDate();
    await createGoal(username, date, text);
    handleBlowUp();
    setForceRefresh(!forceRefresh);
    onChangeText(null);
    nav.navigate("Goals", { isCompletedPage: false });
    goalRef.current.scrollToEnd();
  }

  //retrieve all goals for signed in user
  async function goalList() {
    const username = await getCurrentUser();
    //if checkcompleted is true -> add to this comp list of goals, else incomplete list
    const goals = await getGoals(username);
    tempincgoals = [];
    tempcompgoals = [];
    for (let i = 0; i < goals.length; i++) {
      if (!goals[i].isCompleted) {
        tempincgoals.push(goals[i]);
      } else if (goals[i].isCompleted === true) {
        tempcompgoals.push(goals[i]);
      } else {
        console.error("Goal Screen: Invalid isCompleted Attribute on a goal");
      }
    }
    setCompleteGoals(tempcompgoals);
    setIncompleteGoals(tempincgoals);
  }

  useEffect(() => {
    console.log("refreshing goals screen");
    goalList();
    const focusHandler = nav.addListener("focus", () => {
      setForceRefresh(!forceRefresh);
    }); //Refresh page when navigated to
  }, [forceRefresh, nav]);

  //Generate the list of user goals on the screen
  let incompleteListGoals = incompletegoals.map((goal) => (
    <GoalMini
      description={goal.content}
      key={goal.id}
      onCompleteHandler={async () => {
        let goalId = goal.id;
        await updateGoal(goalId);
        setForceRefresh(!forceRefresh);
      }}
      onDeleteHandler={async () => {
        let goalId = goal.id;
        await deleteGoal(goalId);
        setForceRefresh(!forceRefresh);
      }}
    />
  ));
  if (!incompletegoals?.length)
    incompleteListGoals = (
      <Text style={styles.placeholder}>No In Progress Goals</Text>
    );

  let completedListGoals = completegoals.map((goal) => (
    <CompletedGoalMini
      description={goal.content}
      key={goal.id}
      onDeleteHandler={async () => {
        let goalId = goal.id;
        await deleteGoal(goalId);
        setForceRefresh(!forceRefresh);
      }}
    />
  ));
  if (!completegoals?.length) {
    completedListGoals = (
      <Text style={styles.placeholder}>No Completed Goals</Text>
    );
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.stickyHeader}>
        <Header title={"Goals"} />

        <CustomButton text="Create Goal" onClick={handleBlowUp} />

        <View style={styles.pageChangeButtons}>
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            isSelected={!isCompletedPage}
            text={"In Progress"}
            onClick={() => nav.navigate("Goals", { isCompletedPage: false })}
            textStyle={styles.pageChangeButtonsText}
          ></CustomButton>
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            isSelected={isCompletedPage}
            text={"Completed"}
            onClick={() => nav.navigate("Goals", { isCompletedPage: true })}
            textStyle={styles.pageChangeButtonsText}
          ></CustomButton>
        </View>
      </View>
      <ScrollView ref={goalRef} contentContainerStyle={styles.list}>
        {isCompletedPage ? completedListGoals : incompleteListGoals}
      </ScrollView>

      <View>
        {blowup ? (
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
                    style={styles.button0}
                    onClick={saveGoal}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  stickyHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
  },
  pageChangeButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  pageChangeButtonsText: {
    fontSize: 20,
  },
  placeholder: {
    fontSize: 18,
    padding: 10,
  },
  list: {
    alignItems: "center",
    display: "flex",
    backgroundColor: "white",
    width: "100%",
  },
  textInput: {
    textAlign: "center",
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    margin: 12,
    borderRadius: 100,
  },
  button0: {
    width: 100,
    margin: 10,
  },
  miniContainer: {
    alignItems: "center",
  },
  blowup: {
    width: "100%",
    height: "100%",
    right: 0,
    bottom: 0,
    top: -50,
    backgroundColor: "white",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 2,
    borderTopWidth: 3,
    borderRightColor: "black",
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
    top: 50, //to move it down and center with back button
    zIndex: -1,
  },
});
