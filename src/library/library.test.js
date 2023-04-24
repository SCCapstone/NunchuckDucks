import getPictureFileName from "./getPictureFileName";
import { followerErrorMessage } from "./constants";
import getCreatedAtNumber from "./getCreatedAtNumber";
import { getTimeElapsed } from "./getTimeElapsed";
import { validateWorkoutTitle, validateExerciseName, validateExerciseNotes } from "./Validators";

test("Generates expected format", () => {
  expect(getPictureFileName()).toMatch(/[0-9]{2}-[0-9]{2}-[0-9]{4}-[0-9]{13}/);
});

test(`Generates error message`, () => {
  expect(followerErrorMessage).toMatch("This user either does not exist or is already followed by you.");
});

test(`Generates expected format`, () => {
  expect(String(getCreatedAtNumber("2022-11-25T18:44:00.308Z"))).toMatch(/[0-9]{17}/);
});

test(`Gets time elapsed`, () => {
  expect(getTimeElapsed("2022-11-25T18:44:00.308Z")).toMatch(/[0-9]*[a-z]*/);
});

test(`Validate workout title`, () => {
  expect(validateWorkoutTitle("workout").valueIsValid).toBe(true);
});

test(`Validate exercise title`, () => {
  expect(validateExerciseName("excercise").valueIsValid).toBe(true);
});

test(`Validate exercise notes`, () => {
  expect(validateExerciseNotes(" ").valueIsValid).toBe(false);
})