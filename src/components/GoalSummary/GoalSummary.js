import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton/CustomButton"
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import { getAndObserveGoals } from "../../crud/observeQueries/GoalObserveQueries";
import { useNavigation } from "@react-navigation/native";
import { getGoals } from "../../crud/GoalOperations";

const GoalSummary = ({ username, isCurrentUser = false }) => {
  const [goals, setGoals] = useState([]);
  const [retrieveGoals, setRetrieveGoals] = useState(0);
  const navigation = useNavigation();

  async function goalList() {
    const subscription = getAndObserveGoals(username, setRetrieveGoals);
    return subscription;
  }

  useEffect(() => {
    const updateGoalList = async () => {
      try {
        const goals = await getGoals(username);
        setGoals(goals);
      } catch (err) {
        console.error(err);
      }
    };
    updateGoalList().catch((err) => console.error(err));
    return () => {};
  }, [retrieveGoals, username]);

  useEffect(() => {
    const subscription = goalList();
    return () => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    };
  }, [username]);

  const listGoals = goals
    .filter((val) => !val.isCompleted)
    .map((goal, index) => (
      <View key={goal.id} style={styles.goaltextcontainer}>
        <Text style={styles.goaltitle}>Goal {index + 1}: </Text>
        <Text style={styles.goaltext}>{goal.content}</Text>
      </View>
    ));

  const defaultForNoGoals = (
    <View style={styles.goaltextcontainer}>
      <Text style={styles.goaltitle}>No Goals Found</Text>
    </View>
  );

  return (
    <>
      {isCurrentUser ? (
        <View style={{ backgroundColor: "white", height: "100%" }}>
          <View style={styles.titleBoxCurrUser}>
            <Text style={styles.title}>Your Goals</Text>
          </View>
          <ScrollView style={{ backgroundColor: "white" }}>{listGoals.length === 0 ? defaultForNoGoals : listGoals}</ScrollView>
          <CustomButton
            style={{ alignSelf: "center", marginBottom: "5%", position: "absolute", bottom: "0%" }}
            text="Go to Goals"
            onClick={() => navigation.navigate("Goals")}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{username + "'s"} goals</Text>
          </View>
          <ScrollView>{listGoals.length === 0 ? defaultForNoGoals : listGoals}</ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    //width: 310,
    height: "30%",
    width: "85%",
    backgroundColor: "white",
    borderColor: blueThemeColor,
    borderWidth: 5,
    minHeight: "auto",
    borderRadius: 20,
    flexDirection: "column",
  },
  goaltext: {
    fontSize: 25,
    flex: 1,
    //maxWidth: 300,
  },
  goaltextcontainer: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
  },
  goaltitle: {
    fontSize: 30,
    paddingLeft: 5,
    fontWeight: "600",
  },
  titleBox: {
    //position: "absolute",
    padding: 3,
    backgroundColor: grayThemeColor,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: "#000000",
    borderBottomWidth: 3,
  },
  titleBoxCurrUser: {
    padding: 3,
    //height: 50,
    backgroundColor: grayThemeColor,
    borderColor: "#000000",
    borderBottomWidth: 3,
  },
  title: {
    textAlign: "center",
    width: "auto", //this changes length of line/ box the text exits on
    fontSize: 35,
    paddingTop: 2,

    color: blueThemeColor,
    fontWeight: "bold",
  },
  text: {
    borderTopRightRadius: 20, //curves top right
    borderTopLeftRadius: 20, //curves top left
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default GoalSummary;
