import { DataStore } from "aws-amplify";
import { Workout } from "../models";
import { getUserId } from "./UserOperations";

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

export async function getWorkoutById(workoutId) {
  try {
    let workout = await DataStore.query(Workout, (w) => w.id.eq(workoutId));
    console.log("Got workout", workout, "successfully");
    return workout;
  } catch (e) {
    console.error("Error retrieving the workout for the user", e);
  }
}

/**
 * Returns all goals for any given user
 * @param {String} username
 * @returns goals
 */
export async function getWorkouts(username) {
  try {
    const userId = await getUserId(username);
    const workouts = await DataStore.query(Workout, (w) => w.username.eq(username));
    console.log(`Successfully retrieved workouts for ${username}`);

    return workouts;
  } catch (error) {
    console.error(`Error retrieving workouts for ${username}`);
  }
}

export async function deleteWorkout(workoutId) {
  try {
    const workoutToDelete = await DataStore.query(Workout, workoutId);
    await DataStore.delete(workoutToDelete);
    console.log(`Successfully deleted workout ${workoutToDelete.id}`);
  } catch (error) {
    console.error("Error deleting workout", error);
  }
}
