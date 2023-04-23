import { DataStore } from "aws-amplify";
import { Reaction } from "../models";
import { createNotification } from "./NotificationOperations";
import { getUserByPostId } from "./PostOperations";
import { getDate } from "../library/getDate";
import { getCreatedAt } from "./PostOperations";
import { getTimeElapsed } from "../library/getTimeElapsed";

/**
 * function to create a reaction on a post
 * @param {String} username 
 * @param {String} reactionType 
 * @param {String} postID 
 */
export async function createReaction(username, reactionType, postID) {
  try {
    const reaction = new Reaction({
      postID: postID,
      username: username,
      reactionType: reactionType,
    });
    await DataStore.save(reaction);

    console.log(`Reaction ${reaction.id} successfully created.`);
    let postsUsername = await getUserByPostId(postID);
    let date = getDate();
    let createdAt = await getCreatedAt(postID);
    let time = getTimeElapsed(createdAt);
    let content = username + " reacted to your post from " + time;

    if (postsUsername !== username) await createNotification(postsUsername, date, content, username);
  } catch (error) {
    console.error(`There was an error creating a reaction.`, error);
  }
}

/**
 * function to delete a reaction on a post.
 * @param {String} username 
 * @param {String} reactionType 
 * @param {String} postID 
 */
export async function removeReaction(username, reactionType, postID) {
  try {
    const reactionToDelete = await DataStore.query(Reaction, (r) =>
      r.and((r) => [r.username.eq(username), r.reactionType.eq(reactionType), r.postID.eq(postID)])
    );
    if (reactionToDelete.length === 0) return;
    await DataStore.delete(reactionToDelete[0]);

    console.log(`Reaction successfully removed.`);
  } catch (error) {
    console.error(`There was an error deleting a reaction.`, error);
  }
}

/**
 * function to get reactions on a post.
 * @param {String} postID 
 * @returns reactionList
 */
export async function getReactions(postID) {
  try {
    const reactionList = await DataStore.query(Reaction, (r) => r.postID.eq(postID));
    return reactionList;
  } catch (error) {
    console.error("There was an error retrieving reaction list.", error);
  }
}

/**
 * function to get user reactions.
 * @param {String} postID 
 * @param {String} username 
 * @param {String} reactionType 
 * @returns reactions
 */
export async function getUserReactions(postID, username, reactionType) {
  try {
    const reactions = await DataStore.query(Reaction, (r) =>
      r.and((r) => [r.username.eq(username), r.reactionType.eq(reactionType), r.postID.eq(postID)])
    );
    return reactions;
  } catch (error) {
    console.error("Getting User Reactions: ", error);
  }
}
