import { DataStore } from "aws-amplify";
import { Comment } from "../../models";

export async function getAndObserveComments(postID, setRetrieveComments) {
  try {
    const subscription = DataStore.observe(Comment, (c) =>
      c.postID.eq(postID)
    ).subscribe(
      (snapshot) => {
        setRetrieveComments(Math.random());
      },
      (error) => {
        console.error("Comment subscription Error: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error("Error retrieving comments", error);
  }
}
