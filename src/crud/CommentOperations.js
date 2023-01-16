import { DataStore } from "aws-amplify";
import { Comment } from "../models";

export async function createComment(content, username, postID) {
  try {
    const comment = new Comment({
      content: content,
      username: username,
      postID: postID,
    });
    await DataStore.save(comment);

    console.log(
      `Created comment on post ${postID} by ${username} successfully.`
    );
  } catch (error) {
    console.error("Error creating comment", error);
  }
}

export async function getComments(postID) {
  try {
    const comments = await DataStore.query(Comment, (c) => c.postID.eq(postID));

    console.log(`Retrieved comments for post ${postID} successfully.`);

    return comments;
  } catch (error) {
    console.error("Error retrieving comments", error);
  }
}
