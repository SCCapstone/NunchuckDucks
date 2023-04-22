import { DataStore } from "aws-amplify";
import { Reaction } from "../../models";

export async function getAndObserveReactions(postID, setRetrieveReactions) {
  try {
    const subscription = DataStore.observe(Reaction, (r) =>
      r.postID.eq(postID)
    ).subscribe(
      (snapshot) => {
        setRetrieveReactions(Math.random());
      },
      (error) => {
        console.error("Reaction Subscription Error: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error(error);
  }
}
