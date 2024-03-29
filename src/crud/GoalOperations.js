import { DataStore } from "aws-amplify";
import { Goal } from "../models";
import { getUserId } from "./UserOperations";

/**
 * function to create a goal and save it
 * @param {String} username 
 * @param {String} date 
 * @param {String} content 
 */
export async function createGoal(username, date, content) {
  try {
    const userId = await getUserId(username);

    const goal = new Goal({
      username: username,
      date: date,
      content: content,
      userID: userId,
      isCompleted: false,
    });
    await DataStore.save(goal);
    console.log(`Goal ${goal.id} successfully created.`);
  } catch (error) {
    console.error("Error saving goal", error);
  }
}

/**
 * Returns all goals for any given user
 * @param {String} username
 * @returns goals
 */
export async function getGoals(username) {
  try {
    const goals = await DataStore.query(Goal, (g) => g.username.eq(username));

    console.log(`Successfully retrieved goals for ${username}`);

    return goals;
  } catch (error) {
    console.error(`Error retrieving goals for ${username}`);
  }
}
/**
 * Function to update a specific goal
 * @param {String} goalId 
 */
export async function updateGoal(goalId) {
  try {
    const original = await DataStore.query(Goal, goalId);

    await DataStore.save(
      Goal.copyOf(original, (updated) => {
        updated.isCompleted = !original.i;
      })
    );
    console.log(`Successfully updated goals for current user.`);
  } catch (error) {
    console.error(`Error updating goals for current user.`);
  }
}

/**
 * function to delete a specific goal passed in.
 * @param {String} goalID 
 */
export async function deleteGoal(goalID) {
  try {
    const goalToDelete = await DataStore.query(Goal, goalID);
    await DataStore.delete(goalToDelete);
    console.log(`Successfully deleted goal ${goalToDelete.id}`);
  } catch (error) {
    console.error("Error deleting goal", error);
  }
}
