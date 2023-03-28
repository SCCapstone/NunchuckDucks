import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import { getGoals } from "../../crud/GoalOperations";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
import { getCurrentUser } from "../../crud/CacheOperations";
import { getAndObserveGoals } from "../../crud/observeQueries/GoalObserveQueries";

const GoalSummary = () => {
  const [goals, setGoals] = useState([]);

  async function goalList() {
    let username = await getCurrentUser();
    const subscription = getAndObserveGoals(username, setGoals);
    return subscription;
  }

  useEffect(() => {
    const subscription = goalList();
    return () => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  const listGoals = goals.slice(0, 3).map((goal, index) => (
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
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}>Your Goals</Text>
      </View>
      {listGoals.length === 0 ? defaultForNoGoals : listGoals}
      <Text style={styles.text}>...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 310,
    backgroundColor: "white",
    borderColor: blueThemeColor,
    borderWidth: 4.5,
    minHeight: "auto",
    borderRadius: 10,
    flexDirection: "column",
  },
  goaltext: {
    fontSize: 19,
    maxWidth: 229,
  },
  goaltextcontainer: {
    paddingTop: 5,
    flexDirection: "row",
    textAlign: "left",
  },
  goaltitle: {
    fontSize: 19,
    paddingLeft: 5,
    fontWeight: "600",
  },
  title: {
    textAlign: "center",
    width: "auto", //this changes length of line/ box the text exits on
    fontSize: 22,
    paddingTop: 2,
    height: 33,
    borderTopRightRadius: 7, //curves top right
    borderTopLeftRadius: 7, //curves top left
    color: blueThemeColor,
    fontWeight: "bold",
    backgroundColor: grayThemeColor,
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default GoalSummary;
