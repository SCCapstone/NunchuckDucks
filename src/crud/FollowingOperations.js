import { DataStore } from "aws-amplify";
import { User, Follows} from "../models";

/**
 * Returns a list of all the people that a user follows
 * @param {String} username the user whose following list we're trying to get
 * @returns a list of all the users a given user follows
 */
export async function getFollowsList(username) {
  try {
    const followsList = await DataStore.query(Follows, (f) =>
      f.username.eq(username)
    );

    const newFollowsList = [];

    for (let i = 0; i < followsList.length; i++) {
      let follow = await DataStore.query(User, followsList[i].userID);
      newFollowsList.push(follow);
    }

    return newFollowsList;
  } catch (error) {
    console.error(`Error retrieving follows list for ${username}`);
  }
}
