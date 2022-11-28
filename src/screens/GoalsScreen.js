import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import GoalMini from "../components/GoalMini/GoalMini";
import { getGoals, deleteGoal } from "../crud/GoalOperations";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

export function GoalsScreen() {
  const nav = useNavigation();
  const [goals, setGoals] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(true);

  async function goalList() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    let username = attributes.preferred_username;
    const goals = await getGoals(username);
    setGoals(goals);
  }

  useEffect(() => {
    goalList();
    const focusHandler = nav.addListener("focus", () => {setForceRefresh(!forceRefresh)})
  },[forceRefresh, nav]);
  

  const listGoals = goals.map((goal) => (
    <GoalMini 
      description = {goal.content}

      onDeleteHandler={async() => {
        let goalId = goal.id;
        await deleteGoal(goalId);
        setForceRefresh(!forceRefresh);
      }}
    />
  ));

  return (
    <View>
      <Header title={"Goals"} />

      <View style={styles.container}>
        <CustomButton
          text = "Create Goal"
          onClick = {() => nav.navigate("CreateGoal")}
          style = {styles.button}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
      >
        {listGoals}
      </ScrollView>
      
    </View>
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
})
