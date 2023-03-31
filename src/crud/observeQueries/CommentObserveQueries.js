import { DataStore } from "aws-amplify";
import { Comment } from "../../models";

export async function getAndObserveComments(postID, setAllComments) {
  try {
    const subscription = DataStore.observeQuery(Comment, (c) =>
      c.postID.eq(postID)
    ).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      if (isSynced) setAllComments(items);
    });
    return subscription;
  } catch (error) {
    console.error("Error retrieving comments", error);
  }
}
