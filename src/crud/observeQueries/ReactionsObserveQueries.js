import { DataStore } from "aws-amplify";
import { Reaction } from "../../models";

export async function getAndObserveReactions(postID, setReactions) {
  try {
    const subscription = DataStore.observeQuery(Reaction, (r) =>
      r.postID.eq(postID)
    ).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      if (isSynced) setReactions(items);
    });
    return subscription;
  } catch (error) {
    console.log(error);
  }
}
