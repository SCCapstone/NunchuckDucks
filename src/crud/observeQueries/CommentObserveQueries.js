import { DataStore } from "aws-amplify";
import { Comment } from "../../models";

/**
 * Gets comments from a users post
 * @param {String} postID ID of the post where comments retrieved
 * @param {String} setRetrieveComments the comments wanted to grab 
 * @returns subscription
 **/

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
