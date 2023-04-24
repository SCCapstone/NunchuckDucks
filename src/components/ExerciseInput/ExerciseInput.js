import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextInputWithError from "../CustomTextInputWithError/CustomTextInputWithError";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import {
  validateExerciseName,
  validateExerciseNotes,
} from "../../library/Validators";

export default function ExerciseInput({
  exercise,
  index,
  exerciseListIsValid,
  setExerciseListIsValid,
  exerciseList,
  setExerciseList,
  setExerciseListIsModified,
}) {
  const [isConfirmed, setisConfirmed] = useState(() => {
    if (exercise?.exerciseName) return true;
    else return false;
  });
  const {
    value: exerciseName,
    isValid: exerciseNameIsValid,
    hasError: exerciseNameHasError,
    errorMessage: exerciseNameErrorMessage,
    inputBlurHandler: exerciseNameBlurHandler,
    onChangeHandler: exerciseNameOnChangeHandler,
  } = useInput(validateExerciseName, exercise?.exerciseName);

  const {
    value: exerciseNotes,
    isValid: exerciseNotesIsValid,
    hasError: exerciseNotesHasError,
    errorMessage: exerciseNotesErrorMessage,
    inputBlurHandler: exerciseNotesBlurHandler,
    onChangeHandler: exerciseNotesOnChangeHandler,
  } = useInput(validateExerciseNotes, exercise?.exerciseNotes);

  const confirmExercise = () => {
    if (!exerciseNotesIsValid || !exerciseNameIsValid) {
      exerciseNameBlurHandler();
      exerciseNotesBlurHandler();
      return;
    }

    // Update exerciseList and exerciseListIsValid
    const newValidList = exerciseListIsValid.slice();
    newValidList[index] = true;
    setExerciseListIsValid(newValidList);
    const newExerciseList = exerciseList.slice();
    newExerciseList[index] = {
      exerciseName,
      exerciseNotes,
      id: exerciseList[index].id,
    };
    setExerciseList(newExerciseList);
    setisConfirmed(true);
    setExerciseListIsModified(true);
  };

  const editExercise = () => {
    // Update exerciseListIsValid
    const newList = exerciseListIsValid.slice();
    newList[index] = false;
    setExerciseListIsValid(newList);
    setisConfirmed(false);
  };

  const deleteExercise = () => {
    //  Update ExerciseList and ExerciseListIsValid
    const newExerciseList = [
      ...exerciseList.slice(0, index),
      ...exerciseList.slice(index + 1),
    ];
    setExerciseList(newExerciseList);
    const newExerciseListIsValid = [
      ...exerciseListIsValid.slice(0, index),
      ...exerciseListIsValid.slice(index + 1),
    ];
    setExerciseListIsValid(newExerciseListIsValid);
  };

  let containerStyles = styles.container;
  if (isConfirmed)
    containerStyles = { ...styles.container, flexDirection: "row" };

  return (
    <View style={containerStyles}>
      {!isConfirmed && (
        <View style={styles.textInputContainer}>
          <CustomTextInputWithError
            enteredValue={exerciseName}
            placeholder={"Exercise Name"}
            onBlurHandler={exerciseNameBlurHandler}
            onChangeHandler={exerciseNameOnChangeHandler}
            hasError={exerciseNameHasError}
            errorMessage={exerciseNameErrorMessage}
            customStyles={{ marginLeft: 10 }}
          ></CustomTextInputWithError>
          <CustomTextInputWithError
            enteredValue={exerciseNotes}
            placeholder={"Exercise Notes"}
            onBlurHandler={exerciseNotesBlurHandler}
            onChangeHandler={exerciseNotesOnChangeHandler}
            hasError={exerciseNotesHasError}
            errorMessage={exerciseNotesErrorMessage}
            customStyles={{ marginLeft: 10 }}
            multiline={true}
          ></CustomTextInputWithError>
        </View>
      )}
      {!isConfirmed && (
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <CustomButton
            onClick={confirmExercise}
            style={{
              alignSelf: "center",
              width: "25%",
              marginBottom: 10,
              marginRight: 10,
            }}
            text="Confirm"
          />
          <CustomButton
            onClick={deleteExercise}
            style={{
              alignSelf: "center",
              width: "25%",
              marginBottom: 10,
              marginLeft: 10,
            }}
            text="Delete"
          />
        </View>
      )}
      {isConfirmed && (
        <View style={styles.exerciseContainer} id={index}>
          <View style={styles.exerciseNameContainer}>
            <Text style={styles.exerciseName}>{exerciseName}</Text>
          </View>
          <View>
            <Text style={styles.exerciseNotes}>{exerciseNotes}</Text>
          </View>
        </View>
      )}
      {isConfirmed && (
        <View style={styles.buttonsContainer}>
          <Pressable onPress={editExercise} style={styles.buttonConfirmed}>
            <Image
              style={styles.buttonConfirmed}
              source={require("../../../assets/icons/Gymbit_Icons_Black/Edit_Icon_Black.png")}
            />
          </Pressable>
          <Pressable onPress={deleteExercise} style={styles.buttonConfirmed}>
            <Image
              style={styles.buttonConfirmed}
              source={require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png")}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    minWidth: "100%",

    marginTop: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: "grey",
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    // backgroundColor: "green",
    width: "80%",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonConfirmed: {
    width: 30,
    height: 30,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
  },
  exerciseContainer: {
    display: "flex",
    flexDirection: "column",
    width: "75%",
  },
  exerciseNotes: {
    marginLeft: 20,
  },
});
