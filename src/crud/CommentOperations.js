import { DataStore } from "aws-amplify";
import { Comment, Post } from "../models";
import { getDate } from "../library/getDate";
import { createNotification } from "./NotificationOperations";
import { getCreatedAt } from "./PostOperations";
import { getTimeElapsed } from "../library/getTimeElapsed";
import { getUserByPostId } from "./PostOperations";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";

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
    let createdAt = await getCreatedAt(postID);
    let time = getTimeElapsed(createdAt);
    let userForNoti = await getUserByPostId(postID);
    let notiContent = username + " commented on your post from " + time;

    if (userForNoti !== username)
      await createNotification(userForNoti, date, notiContent, username);
      
    console.log(
      `Created comment on post ${postID} by ${username} successfully.`
    );
  } catch (error) {
    console.error("Error creating comment", error);
  }
}

export async function deleteComment(commentsId) {
  const comment = await DataStore.query(Comment, commentsId);

  await DataStore.delete(comment);
}

export async function getComments(postID) {
  try {
    const comments = await DataStore.query(Comment, (c) => c.postID.eq(postID));

    return comments;
  } catch (error) {
    console.error("Error retrieving comments", error);
  }
}

export async function checkForDeletability(postID, username) {
  const post = await DataStore.query(Post, postID);

  const postUsername = post.username;

  const currUsername = await getCurrentAuthenticatedUser();
  
  return postUsername === currUsername || username === currUsername
}
