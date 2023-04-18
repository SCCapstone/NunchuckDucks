import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import { blueThemeColor, grayThemeColor } from "../../library/constants";
import Exercise from "../Exercise/Exercise";
import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { deleteWorkout } from "../../crud/WorkoutOperations";
import ConfirmDelete from "../modals/ConfirmDelete/ConfirmDelete";

export default function WorkoutMini({ workout, refreshWorkouts, setRefreshWorkouts, openCreateWorkoutModal }) {
  const [viewMore, setViewMore] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // TODO: Move this validation logic elsewhere; preferably to the DataStore query
  if (Array.isArray(workout) && workout.length > 0) {
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

  const displayedExercises = viewMore ? JsonExercises : JsonExercises.slice(0, 2);

  async function DeleteWorkoutHandler(id) {
    // TODO: Check for error
    await deleteWorkout(id);
    setRefreshWorkouts(!refreshWorkouts);
  }

  return (
    <View style={styles.blowupmain}>
      <ConfirmDelete
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        id={workout.id}
        text={"Delete Workout?"}
        deletefunc={DeleteWorkoutHandler}
      ></ConfirmDelete>
      <View style={styles.blowupheader}>
        <View style={styles.buttonsContainer}></View>
        <Text style={styles.workoutName}>{workoutName}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => openCreateWorkoutModal(JsonWorkout, JsonExercises)} style={styles.buttonConfirmed}>
            <Image style={styles.button} source={require("../../../assets/icons/Gymbit_Icons_Black/Edit_Icon_Black.png")} />
          </Pressable>
          <Pressable onPress={() => setDeleteModalVisible(true)} style={styles.buttonConfirmed}>
            <Image style={styles.button} source={require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png")} />
          </Pressable>
        </View>
      </View>
      <View>
        {displayedExercises.map((exercise, index) => (
          <Exercise key={exercise.id} exercise={exercise} index={index} />
        ))}
      </View>
      {JsonExercises.length > 2 && (
        <CustomButton
          buttonType={"hyperlink"}
          isUnderlined={true}
          onClick={() => setViewMore(!viewMore)}
          text={viewMore ? "View Less" : "View More"}
          style={{ alignSelf: "center" }}
        ></CustomButton>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  blowupmain: {
    width: "100%",
    backgroundColor: grayThemeColor,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    marginBottom: 20,
    paddingBottom: 5,
  },
  blowupheader: {
    minHeight: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",

    marginBottom: 10,
    borderColor: "black",
    marginTop: 2,
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  blowupbody: {
    fontSize: 21,
    textAlign: "left",
    paddingLeft: 20,
    marginTop: 5,
  },
  workoutName: {
    color: blueThemeColor,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
    maxWidth: "60%",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
    padding: 5,
  },
  button: {
    width: 30,
    height: 30,
  },
});
