import { DataStore } from "aws-amplify";
import { Post } from "../../models";
import { getCurrentUser } from "../CacheOperations";
import { getUserId } from "../UserOperations";

/**
 * 
 * @param {String} username of the user retrieving posts from
 * @param {String} setRetrievePosts set of the posts a user has to see.
 * @returns subscription of posts
 * 
 **/
export async function getAndObservePersonalPosts(setRetrievePosts) {
  try {
    let username = await getCurrentUser();
    let userId = await getUserId(username);
    const subscription = DataStore.observe(Post, (p) =>
      p.userID.eq(userId)
    ).subscribe(
      (snapshot) => {
        setRetrievePosts(Math.random());
      },
      (error) => {
        console.error("Personal Post subscription Error: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error("Error retrieving Personal posts", error);
  }
}
