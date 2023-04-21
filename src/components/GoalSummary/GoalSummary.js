import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import { getGoals } from "../../crud/GoalOperations";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
import { getCurrentUser } from "../../crud/CacheOperations";
import { getAndObserveGoals } from "../../crud/observeQueries/GoalObserveQueries";
import CustomButton from "../CustomButton";
import { useNavigation } from "@react-navigation/native";

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
        <>
          <Pressable
            onPress={() => navigation.navigate("Goals")}
            style={styles.titleBox}
          >
            <Text style={styles.title}>Your Goals</Text>
          </Pressable>
          <ScrollView style={{ backgroundColor: "white" }}>
            {listGoals.length === 0 ? defaultForNoGoals : listGoals}
          </ScrollView>
        </>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{username + "'s"} goals</Text>
          </View>
          <ScrollView>
            {listGoals.length === 0 ? defaultForNoGoals : listGoals}
          </ScrollView>
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
    fontSize: 30,
    flex: 1,
    //maxWidth: 300,
  },
  goaltextcontainer: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    textAlign: "left",
  },
  goaltitle: {
    fontSize: 30,
    paddingLeft: 5,
    fontWeight: "600",
  },
  titleBox: {
    //position: "absolute",
    backgroundColor: grayThemeColor,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: "#000000",
    borderBottomWidth: 3,
  },
  title: {
    textAlign: "center",
    width: "auto", //this changes length of line/ box the text exits on
    fontSize: 22,
    paddingTop: 2,
    height: 33,
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
