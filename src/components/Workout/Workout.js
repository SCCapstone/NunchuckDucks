import { View, ScrollView, Text, StyleSheet } from "react-native";
import { blueThemeColor } from "../../library/constants";
import Exercise from "../Exercise/Exercise";
export default function Workout({ workout, isAbsolute = false }) {
  if (Array.isArray(workout)) {
    workout = workout[0];
  }
  let JsonWorkout = workout;
  try {
    JsonWorkout = JSON.parse(JsonWorkout);
  } catch {
    JsonWorkout = workout;
  }
  let JsonExercises = JsonWorkout.exercises;
  try {
    JsonExercises = JSON.parse(JsonExercises);
  } catch {
    JsonExercises = JsonWorkout.exercises;
  }
  let workoutName = JsonWorkout.workoutName;
  return (
    <View key={workout.id} style={isAbsolute ? styles.blowupmainAbsolute : styles.blowupmain}>
      <View style={styles.blowupheader}>
        <Text style={styles.workoutName}>{workoutName}</Text>
      </View>
      <ScrollView>
        {JsonExercises.map((exercise, index) => (
          <Exercise exercise={exercise} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  blowupmain: {
    width: "100%",
    height: 400,
    //position: this.
    //height: 400,
    //marginTop: 20,
    //position: "absolute",
    //right: 0,
    backgroundColor: "rgba(200,212,225,0.7)",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 2,
    borderTopWidth: 3,
    borderRightColor: "black",
    marginBottom: 20,
  },
  blowupmainAbsolute: {
    width: "100%",
    height: 400,
    position: "absolute",
    //height: 400,
    //marginTop: 20,
    //position: "absolute",
    //right: 0,
    backgroundColor: "rgba(200,212,225,0.7)",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 2,
    borderTopWidth: 3,
    borderRightColor: "black",
    marginBottom: 20,
  },
  blowupheader: {
    height: 43,
    marginBottom: 10,
    borderColor: "black",
    color: blueThemeColor,
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
    alignItems: "center",
    borderBottomWidth: 3,
  },
  blowupbody: {
    fontSize: 21,
    textAlign: "left",
    paddingLeft: 20,
    marginTop: 5,
  },
  workoutName: {
    color: blueThemeColor,
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
    //textAlign: "center",
    //borderBottomWidth: 3,
  },
});
