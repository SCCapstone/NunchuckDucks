import { View, StyleSheet, TextInput } from "react-native";
import Header from "../components/Header";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Storage } from "@aws-amplify/storage";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { createGoal } from "../crud/GoalOperations";
import { getDate } from "../library/getDate";

//Allow user to create a new goal
export function CreateGoalScreen() {
  const [text, onChangeText] = React.useState(null); //Add text for the goal description
  const navigation = useNavigation();

  Storage.configure();
  //Create new goal from users text input
  async function saveGoal() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    let username = attributes.preferred_username;
    var date = getDate();
    createGoal(username, date, text);
    navigation.navigate("Goals");
  }

  return (
    <View>
      <Header title={"Create Goal"} />

      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder={"Enter details about your goal"}
          value={text}
          multiline={true}
        />
        <View style={styles.miniContainer}>
          <CustomButton text="Create Goal" style={styles.button} onClick={saveGoal} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
