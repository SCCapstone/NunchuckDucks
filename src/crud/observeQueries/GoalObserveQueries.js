import { DataStore } from "aws-amplify";
import { Goal } from "../../models";

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
