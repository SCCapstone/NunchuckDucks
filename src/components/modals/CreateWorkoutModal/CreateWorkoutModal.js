import { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity, Modal, TextInput, Button, ScrollView } from "react-native";
import CustomButton from "../../CustomButton";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { blueThemeColor, grayThemeColor } from "../../../library/constants";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getCurrentUser } from "../../../crud/CacheOperations";
import { createWorkout } from "../../../crud/WorkoutOperations";
import Exercise from "../../Exercise/Exercise";
export default function CreateWorkoutModal({
  modalVisible,
  setModalVisible,
  refreshWorkouts,
  setRefreshWorkouts,
  scrollToBottom = null,
  setScrollToBottom = null,
  setWorkoutSelection = null,
}) {
  //const modalVisible = props.modalVisible;
  //const setModalVisible = props.setModalVisible;
  const [workoutTitle, setWorkoutTitle] = useState("");
  //const [setsList, addToSetsList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseNotes, setExerciseNotes] = useState("");
  const [buttonShown, setButtonShown] = useState(true);
  const [addNewExercise, setAddNewExercise] = useState(false);
  const [exerciseNameNotSet, setExerciseNameNotSet] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  function handleButtonPress() {
    setAddNewExercise(true);
    setButtonShown(false);
  }
  function handleConfirmPress() {
    if (exerciseName.length === 0) {
      Toast.show({
        type: "error",
        text1: "Please name the exercise!",
        position: "bottom",
        visibilityTime: 3000,
        bottomOffset: 80,
      });
    } else {
      let exercise = {
        exerciseName: exerciseName,
        exerciseNotes: exerciseNotes,
      };

      setExerciseList([...new Set([...exerciseList, exercise])]);
      setExerciseName("");
      setExerciseNotes("");
      setButtonShown(true);
      setAddNewExercise(false);
    }
  }
  async function createNewWorkout() {
    let currUser = await getCurrentUser();
    let newWorkout = await createWorkout(currUser, workoutTitle, exerciseList);
    if (scrollToBottom !== null) {
      setScrollToBottom(true);
    }
    setRefreshWorkouts(!refreshWorkouts);
    setModalVisible(false);
  }

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <Pressable onPress={closeModal} style={styles.transparentView} />
        <View style={styles.blowupmain}>
          <View style={styles.blowupheader}>
            <TextInput style={styles.workoutName} placeholder="Name the workout" onChangeText={setWorkoutTitle} />
          </View>
          <ScrollView>
            {exerciseList.map((exercise, index) => (
              <Exercise key={index} exercise={exercise} />
            ))}
            {/*<Text style={styles.blowupbody}>- Hello</Text>*/}
            {addNewExercise && (
              <View>
                <View style={styles.addExerciseContainer}>
                  <View style={styles.addExerciseNameContainer}>
                    <TextInput onChangeText={setExerciseName} placeholder={"Name the exercise"} style={styles.exerciseName} />
                  </View>
                  <View>
                    <TextInput
                      style={styles.exerciseNotes}
                      onChangeText={setExerciseNotes}
                      placeholder={"Add exercise notes (sets, reps, etc)"}
                    />
                  </View>
                </View>
                {exerciseName !== "" && exerciseNotes !== "" && <CustomButton onClick={handleConfirmPress} text="Confirm Exercise" />}
              </View>
            )}
            {buttonShown && <CustomButton onClick={handleButtonPress} style={{ alignSelf: "center" }} text="Add Exercise" />}
          </ScrollView>
        </View>
        {exerciseList.length > 0 && workoutTitle !== "" && (
          <CustomButton onClick={createNewWorkout} style={{ width: "100%" }} text="Create workout" />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  exerciseNotes: {
    marginLeft: 20,
  },
  addExerciseContainer: {
    //flex: 1,
    minHeight: 100,
    flexDirection: "column",
    //backgroundColor: "#202124",
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    //alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  exerciseContainer: {
    //flex: 1,
    //minHeight: 100,
    flexDirection: "column",
    //backgroundColor: "#202124",
    //alignItems: "center",
    //alignSelf: "center",
    width: "80%",
  },
  addExerciseNameContainer: {
    // flexDirection: "row",
    height: 30,
    //marginBottom: 20,
    //borderColor: "black",
    //textAlign: "center",
    borderBottomWidth: 3,
  },
  exerciseNameContainer: {
    height: 30,
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
  exerciseName: {
    color: blueThemeColor,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
    //textAlign: "center",
    //borderBottomWidth: 3,
  },
  centeredView: {
    flex: 1,
    //top: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  transparentView: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    zIndex: -1,
  },
  blowupmain: {
    width: "100%",
    height: 400,
    //position: "absolute",
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
});
