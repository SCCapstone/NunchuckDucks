import { DataStore } from "aws-amplify";
import { Reaction } from "../models";

export async function createReaction(username, reactionType, postID) {
  try {
    const reaction = new Reaction({
      username: username,
      reactionType: reactionType,
      postID: postID,
    });
    await DataStore.save(reaction);

    console.log(`Reaction ${reaction.id} successfully created.`);
  } catch (error) {
    console.error(`There was an error creating a reaction.`, error);
  }
}

export async function getReactions(postID) {
  try {
    const reactionList = await DataStore.query(Reaction, (r) =>
      r.postID.eq(postID)
    );

    console.log(`Successfully retrieved reactions for post ${postID}.`);
    return reactionList;
  } catch (error) {
    console.error("There was an error retrieving reaction list.", error);
  }
}
