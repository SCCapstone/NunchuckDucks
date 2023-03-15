import { DataStore } from "aws-amplify";
import { Reaction } from "../models";

export async function createReaction(username, reactionType, postID) {
  try {
    console.log("POSTID: ", postID);
    const reaction = new Reaction({
      postID: postID,
      username: username,
      reactionType: reactionType,
    });
    await DataStore.save(reaction);

    console.log(`Reaction ${reaction.id} successfully created.`);
  } catch (error) {
    console.error(`There was an error creating a reaction.`, error);
  }
}

export async function removeReaction(username, reactionType, postID) {
  try {
    const reactionToDelete = await DataStore.query(Reaction, (r) =>
      r.and((r) => [
        r.username.eq(username),
        r.reactionType.eq(reactionType),
        r.postID.eq(postID),
      ])
    );
    if (reactionToDelete.length === 0) return;
    await DataStore.delete(reactionToDelete[0]);

    console.log(`Reaction successfully removed.`);
  } catch (error) {
    console.error(`There was an error deleting a reaction.`, error);
  }
}

export async function getReactions(postID) {
  try {
    const reactionList = await DataStore.query(Reaction, (r) =>
      r.postID.eq(postID)
    );
    return reactionList;
  } catch (error) {
    console.error("There was an error retrieving reaction list.", error);
  }
}

export async function getUserReactions(postID, username, reactionType) {
  try {
    const reactions = await DataStore.query(Reaction, (r) =>
      r.and((r) => [
        r.username.eq(username),
        r.reactionType.eq(reactionType),
        r.postID.eq(postID),
      ])
    );
    return reactions;
  } catch (error) {
    console.error("Getting User Reactions: ", error);
  }
}
