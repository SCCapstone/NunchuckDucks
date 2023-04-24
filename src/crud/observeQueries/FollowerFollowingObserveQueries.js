import { DataStore } from "aws-amplify";
import { Follows } from "../../models";
import { getUserId } from "../UserOperations";

/**
 * Gets followers and following users
 * @param {String} username of the user retrieving following and followers list from
 * @param {String} setRetrieveFollowing set for the users a specific user is following 
 * @param {String} setRetrieveFollowers set of users that follow the user
 * @returns subscription
 **/

export async function getAndObserveFollowing(username, setRetrieveFollowing) {
  try {
    const subscription = DataStore.observe(Follows, (f) =>
      f.username.eq(username)
    ).subscribe(
      (snapshot) => {
        setRetrieveFollowing(Math.random());
      },
      (error) => {
        console.error("Following subscription Error: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error("Error retrieving Following", error);
  }
}

export async function getAndObserveFollowers(username, setRetrieveFollowers) {
  try {
    const userId = await getUserId(username);

    const subscription = DataStore.observe(Follows, (f) =>
      f.userID.eq(userId)
    ).subscribe(
      (snapshot) => {
        setRetrieveFollowers(Math.random());
      },
      (error) => {
        console.error("Follower subscription: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error("Retrieving Followers", error);
  }
}
