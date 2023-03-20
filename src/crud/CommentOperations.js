import { DataStore } from "aws-amplify";
import { Comment } from "../models";
import { getDate } from "../library/getDate";
import { createNotification } from "./NotificationOperations";

export async function createComment(content, username, postID, replyID) {
  try {
    const comment = new Comment({
      content: content,
      username: username,
      postID: postID,
      reply: replyID,
    });
    await DataStore.save(comment);

    let date = getDate();
    let notiContent = username + " commented on your post!";
    await createNotification(username, date, notiContent);

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

    return comments;
  } catch (error) {
    console.error("Error retrieving comments", error);
  }
}
