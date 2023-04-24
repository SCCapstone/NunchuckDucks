import { DataStore } from "aws-amplify";
import { Workout } from "../../models";

export async function getAndObserveWorkouts(username, setRetrieveWorkouts) {
  try {
    const subscription = DataStore.observe(Workout, (w) =>
      w.username.eq(username)
    ).subscribe(
      (snapshot) => {
        setRetrieveWorkouts(Math.random());
      },
      (error) => {
        console.error("Reaction Subscription Error: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error("Getting Workout subscription: ", error);
  }
}
