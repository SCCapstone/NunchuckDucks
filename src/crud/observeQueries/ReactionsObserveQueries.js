import { DataStore } from "aws-amplify";
import { Reaction } from "../../models";

/**
 * @param {String} postID id of the post we want to get reactions for
 * @param {String} setRetrieveReactions set of the reactions for a users posts.
 * @returns subscription reactions for a given postID
 **/

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
