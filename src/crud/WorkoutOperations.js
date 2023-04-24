import { DataStore } from "aws-amplify";
import { Workout } from "../models";
import { getUserId } from "./UserOperations";

/**
 * Creates a workout
 * @param {String} username
 * @param {String} workoutName
 * @param {String} exercises
 * @returns workout
 */
export async function createWorkout(username, workoutName, exercises) {
  try {
    const userId = await getUserId(username);
    let exercisesString = JSON.stringify(exercises);
    const workout = new Workout({
      username: username,
      workoutName: workoutName,
      exercises: exercisesString,
      userID: userId,
    });
    await DataStore.save(workout);
    console.log(`Workout ${workout.id} successfully created.`);
    return workout;
  } catch (error) {
    console.error("Error saving workout", error);
    return "";
  }
}

/**
 * Updates a created workout
 * @param {String} workoutId
 * @param {String} workoutName
 * @param {String} exercises
 * @returns workout
 */
export async function updateWorkoutById(workoutId, workoutName, exercises) {
  try {
    let queriedWorkout = await DataStore.query(Workout, workoutId);
    console.log(queriedWorkout);
    let exercisesString = JSON.stringify(exercises);

    const workout = await DataStore.save(
      Workout.copyOf(queriedWorkout, (updated) => {
        updated.workoutName = workoutName;
        updated.exercises = exercisesString;
      })
    );
    console.log(`Workout ${workout.id} successfully updated.`);
    return workout;
  } catch (error) {
    console.error("Error updating workout", error);
    return "";
  }
}

/**
 * Grabs a given workout by ID
 * @param {String} workoutId
 * @returns workout
 */
export async function getWorkoutById(workoutId) {
  try {
    let workout = await DataStore.query(Workout, (w) => w.id.eq(workoutId));
    return workout;
  } catch (e) {
    console.error("Error retrieving the workout for the user", e);
  }
}

/**
 * Returns all workouts for user
 * @param {String} username
 * @returns workouts
 */
export async function getWorkouts(username) {
  try {
    const workouts = await DataStore.query(Workout, (w) =>
      w.username.eq(username)
    );
    console.log(`Successfully retrieved workouts for ${username}`);

    return workouts;
  } catch (error) {
    console.error(`Error retrieving workouts for ${username}`);
  }
}

/**
 * Deletes a workout by ID
 * @param {String} workoutId
 */
export async function deleteWorkout(workoutId) {
  try {
    const workoutToDelete = await DataStore.query(Workout, workoutId);
    await DataStore.delete(workoutToDelete);
    console.log(`Successfully deleted workout ${workoutToDelete.id}`);
  } catch (error) {
    console.error("Error deleting workout", error);
  }
}
