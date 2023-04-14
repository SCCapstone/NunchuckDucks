import { isString } from "formik";

const isEmpty = (str) => {
  if (str === "") return true;
  else return false;
};

const isOnlySpace = (str) => {
  if (isString(str) && str !== "" && str.trim() === "") return true;
  else return false;
};

const exceedsCharacterLimit = (str, limit) => {
  if (isString(str) && str.length > limit) return true;
  else return false;
};

const validateWorkoutTitle = (val) => {
  const characterLimit = 50;

  if (isEmpty(val))
    return {
      valueIsValid: false,
      errorMessage: "Workout title cannot be empty",
    };
  else if (isOnlySpace(val)) {
    return {
      valueIsValid: false,
      errorMessage: "Workout title cannot be just empty space",
    };
  } else if (exceedsCharacterLimit(val, characterLimit)) {
    return {
      valueIsValid: false,
      errorMessage: `Workout must be ${characterLimit} characters or less`,
    };
  } else return { valueIsValid: true };
};

const validateExerciseName = (val) => {
  const characterLimit = 50;

  if (isEmpty(val))
    return {
      valueIsValid: false,
      errorMessage: "Exercise title cannot be empty",
    };
  else if (isOnlySpace(val)) {
    return {
      valueIsValid: false,
      errorMessage: "Exercise title cannot be just empty space",
    };
  } else if (exceedsCharacterLimit(val, characterLimit)) {
    return {
      valueIsValid: false,
      errorMessage: `Exercise must be ${characterLimit} characters or less`,
    };
  } else return { valueIsValid: true };
};

const validateExerciseNotes = (val) => {
  if (isEmpty(val))
    return {
      valueIsValid: false,
      errorMessage: "Exercise notes cannot be empty",
    };
  else if (isOnlySpace(val)) {
    return {
      valueIsValid: false,
      errorMessage: "Exercise notes cannot be just empty space",
    };
  } else return { valueIsValid: true };
};

export { validateWorkoutTitle, validateExerciseName, validateExerciseNotes };
