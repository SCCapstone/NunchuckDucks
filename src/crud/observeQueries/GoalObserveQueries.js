import { DataStore } from "aws-amplify";
import { Goal } from "../../models";

export async function getAndObserveGoals(username, setGoals) {
  try {
    const subscription = DataStore.observeQuery(Goal, (g) =>
      g.username.eq(username)
    ).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      if (isSynced) setGoals(items);
    });
    return subscription;
  } catch (error) {
    console.error(`Error retrieving goals for ${username}`);
  }
}
