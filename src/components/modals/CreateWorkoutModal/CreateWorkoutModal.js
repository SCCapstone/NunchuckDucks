import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

import CustomButton from "../../CustomButton";
import { blueThemeColor } from "../../../library/constants";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getCurrentUser } from "../../../crud/CacheOperations";
import {
  createWorkout,
  updateWorkoutById,
} from "../../../crud/WorkoutOperations";
import CustomTextInputWithError from "../../CustomTextInputWithError/CustomTextInputWithError";
import useInput from "../../../hooks/useInput";
import ExerciseInput from "../../ExerciseInput/ExerciseInput";
import { validateWorkoutTitle } from "../../../library/Validators";

export default function CreateWorkoutModal({
  modalVisible,
  setModalVisible,
  refreshWorkouts,
  setRefreshWorkouts,
  workout,
  setWorkout,
  modelExerciseList,
  setModelExerciseList,
  scrollToBottom = null,
  setScrollToBottom = null,
}) {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseListIsValid, setExerciseListIsValid] = useState([]);
  const [submitTouched, setSubmitTouched] = useState(false);
  const {
    value: workoutTitle,
    isValid: workoutTitleIsValid,
    hasError: workoutTitleHasError,
    errorMessage: workoutTitleErrorMessage,
    inputBlurHandler: workoutTitleBlurHandler,
    onChangeHandler: workoutTitleOnChangeHandler,
    reset: workoutTitleReset,
  } = useInput(validateWorkoutTitle, workout?.workoutName);

  useEffect(() => {
    if (!modelExerciseList) return;
    setExerciseList(modelExerciseList);
    setExerciseListIsValid(Array(modelExerciseList.length).fill(true));
  }, [modelExerciseList]);

  const validateForm = () => {
    // Check for overall form errors (combined exercises)
    const allExercisesConfirmed = exerciseListIsValid.reduce(
      (prev, curr) => prev && curr,
      true
    );
    if (!allExercisesConfirmed) {
      return {
        hasError: true,
        errorMessage: "All exercises must be confirmed",
      };
    } else if (exerciseList.length === 0) {
      return {
        hasError: true,
        errorMessage: "A workout must have at least one exercise",
      };
    } else if (!workoutTitleIsValid || !allExercisesConfirmed) {
      // We don't want to display an errorMessage at the form level here
      return { hasError: true, errorMessage: "" };
    }
    return { hasError: false, errorMessage: "" };
  };

  const formError = submitTouched ? validateForm().errorMessage : "";

  const exercises = exerciseList.map((exercise, index) => {
    return (
      <ExerciseInput
        key={exercise.id}
        exercise={exercise}
        index={index}
        exerciseListIsValid={exerciseListIsValid}
        setExerciseListIsValid={setExerciseListIsValid}
        exerciseList={exerciseList}
        setExerciseList={setExerciseList}
      />
    );
  });

  const closeModal = () => {
    resetForm();
    setModalVisible(false);
  };

  const resetForm = () => {
    setExerciseList([]);
    setExerciseListIsValid([]);
    setSubmitTouched(false);
    workoutTitleReset();
    setWorkout(null);
    setModelExerciseList(null);
  };

  const handleAddExercise = () => {
    //  TODO: Create a more reliable UUID
    let exercise = {
      exerciseName: "",
      exerciseNotes: "",
      id: "id" + Math.random().toString(16).slice(2),
    };

    setExerciseList([...exerciseList, exercise]);
    setExerciseListIsValid([...exerciseListIsValid, false]);
  };

  const handleSubmit = () => {
    // Set all inputs to touched
    workoutTitleBlurHandler();

    //  Check for valid form
    const { hasError, errorMessage } = validateForm();
    if (hasError) {
      setSubmitTouched(true);
      return;
    }

    // TODO: Add loading animation while workout is created; replace submit button with loading button
    // TODO: Handle error returned by createNewWorkout
    createOrUpdateWorkout();
  };

  async function createOrUpdateWorkout() {
    if (!workout) {
      let currUser = await getCurrentUser();
      let newWorkout = await createWorkout(
        currUser,
        workoutTitle,
        exerciseList
      );
    } else {
      await updateWorkoutById(workout.id, workoutTitle, exerciseList);
    }
    //TODO: check for errors here

    if (scrollToBottom !== null) {
      setScrollToBottom(true);
    }
    setRefreshWorkouts(!refreshWorkouts);
    closeModal();
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <Pressable onPress={closeModal} style={styles.transparentView} />
        <View style={styles.blowupmain}>
          <View style={styles.blowupheader}>
            <CustomTextInputWithError
              enteredValue={workoutTitle}
              onChangeHandler={workoutTitleOnChangeHandler}
              onBlurHandler={workoutTitleBlurHandler}
              hasError={workoutTitleHasError}
              errorMessage={workoutTitleErrorMessage}
              placeholder={"Workout Name"}
            ></CustomTextInputWithError>
          </View>
          <ScrollView>
            {exercises}
            <CustomButton
              onClick={handleAddExercise}
              style={{ alignSelf: "center", marginTop: 20 }}
              text="Add Exercise"
            />
          </ScrollView>
          <CustomButton
            onClick={handleSubmit}
            style={{ width: "50%", alignSelf: "center", marginTop: 5 }}
            text={`${workout ? "Update" : "Create"} Workout`}
          />
          {formError && <Text style={styles.errorText}>{formError}</Text>}
          {!formError && <Text style={styles.errorText}> </Text>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  exerciseNotes: {
    marginLeft: 20,
  },
  addExerciseContainer: {
    minHeight: 100,
    flexDirection: "column",
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    marginTop: 10,
    alignSelf: "center",
    width: "80%",
  },
  exerciseContainer: {
    flexDirection: "column",

    width: "80%",
  },
  addExerciseNameContainer: {
    height: 30,

    borderBottomWidth: 3,
  },
  exerciseNameContainer: {
    height: 40,
  },
  workoutName: {
    textAlign: "center",
    color: blueThemeColor,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
    width: "100%",
  },
  exerciseName: {
    color: blueThemeColor,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  transparentView: {
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
    height: 450,
    minHeight: 400,

    backgroundColor: "white",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    // borderWidth: 2,
    borderTopWidth: 1,
    borderRightColor: "black",
  },
  blowupheader: {
    borderColor: "black",
    color: blueThemeColor,
    fontSize: 50,
    fontWeight: "bold",
    width: "100%",
    marginTop: 16,
    textAlign: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  blowupbody: {
    fontSize: 21,
    textAlign: "left",
    paddingLeft: 20,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 11,
    minHeight: 20,
    textAlign: "center",
  },
});
