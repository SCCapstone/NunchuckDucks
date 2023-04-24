import { DataStore } from "aws-amplify";
import { Goal } from "../../models";

/**
 * Gets followers and following users
 * @param {String} username of the user retrieving goals list from
 * @param {String} setRetrieveGoals set for the goals use a specific user has
 * @returns subscription
 **/

export async function getAndObserveGoals(username, setRetrieveGoals) {
  try {
    const subscription = DataStore.observe(Goal, (g) =>
      g.username.eq(username)
    ).subscribe(
      (snapshot) => {
        setRetrieveGoals(Math.random());
      },
      (error) => {
        console.error("Goal subscription Error: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error(`Error subscribing for goals from ${username}`);
  }
}
