import { processCompositeKeys } from "@aws-amplify/datastore/lib-esm/util";
import { Int64 } from "@aws-sdk/eventstream-codec";
import { getCurrentUser } from "./CacheOperations";
import { DataStore, SortDirection } from "aws-amplify";
import { Post, Follows, User } from "../models";
import { getUserId } from "./UserOperations";
/**
 * Creates a post and saves the new post in the backend
 * @param {String} username
 * @param {String} password
 * @param {Image} profilePicture
 * @param {String} bio
 */
export async function createPost(caption, photo, username) {
  try {
    const user = await getCurrentUser();

    const userId = await getUserId(user);

    await DataStore.save(
      new Post({
        caption: caption,
        photo: photo,
        username: username,
        userID: userId,
      })
    );
    console.log(`Post  successfully created.`);
  } catch (error) {
    console.error("Error saving post", error);
  }
}

/**
 * Queries the database for a specific post, then deletes that post
 * @param {Post} post
 */
export async function deletePost(postID) {
  try {
    const postToDelete = await DataStore.query(Post, postID);
    DataStore.delete(postToDelete);
    console.log(`Deleted post ${postID} successfully.`);
  } catch (error) {
    console.log("Error deleting post", error);
  }
}
export async function getUsersFollowed(username) {
  try {
    const followsList = await DataStore.query(Follows, (f) => f.username.eq(username));

    const newFollowsList = [];

    for (let i = 0; i < followsList.length; i++) {
      let follow = await DataStore.query(User, followsList[i].userID);
      newFollowsList.push(follow.username);
    }
    console.log(`Successfully retrieved follows list for ${username}.`);

    return newFollowsList;
  } catch (error) {
    console.error(`Error retrieving follows list for ${username}`);
  }
}

export async function getPostsForMutualFeedFromAWS(username) {
  try {
    const userId = await getUserId(username);

    const usersFollowed = await DataStore.query(Follows, (uf) => uf.username.eq(username));
    const usersFollowedIDs = [userId];

    console.log(`Retrieved users followed for ${username}`);

    for (let i = 0; i < usersFollowed.length; i++) {
      usersFollowedIDs.push(usersFollowed[i].userID);
    }

    const posts = [];

    for (let i = 0; i < usersFollowedIDs.length; i++) {
      let postsToBeAdded = await DataStore.query(Post, (p) => p.userID.eq(usersFollowedIDs[i]), {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
      });
      for (let j = 0; j < postsToBeAdded.length; j++) {
        if (dateIsInPast3Days(postsToBeAdded[j]))
          posts.push(postsToBeAdded[j]);
      }
    }

    posts.sort(function (a, b) {
      if (b.createdAt > a.createdAt) {
        return 1; // if that post is newer (higher number), then keep them in order; a then b
      } else {
        return -1; // if not, then reverse; b then a
      }
    });

    /*for (let i = 0; i < posts.length; i++) {
      posts[i].count = parseInt
    }*/

    console.log(`Retrieved posts for user ${username}'s mutual page successfully.`);

    return posts;
  } catch (error) {
    console.error(`Error retrieving posts for ${username}'s mutual feed, ${error}`);
  }
}

function dateIsInPast3Days(post) {

  const createdAt = post.createdAt;

  const difference = getTime(createdAt);

  if (difference > 3)
    return false;
  else
    return true;

  }

  function getTime(createdAt) {
    var ans = ""; // the output
  if (createdAt == undefined) {
    // Checks that createdAt exists
    // Will not exist when DataStore is not connected to remote
    return ans;
  }
  var createdAtFormatted = createdAt.substring(0, 19); //gets rid of a few milliseconds to make it proper format
  var currDate = new Date(); // current date and time in UTC
  var dateUploaded = new Date(createdAtFormatted); // date and time of upload in UTC

  // Both dates are already in UTC, this just gets the time difference
  var diff = currDate.getTime() - dateUploaded.getTime();
  var minutesDifference = diff / (1000 * 60);
  var hoursDifference = Math.floor(minutesDifference / 60);
  var daysDifference = Math.floor(hoursDifference / 24);
  

    
  return Math.round(daysDifference)
  }


export async function getUserByPostId(postId) {
    const post = await DataStore.query(Post, postId);
    return post.username;
}

export async function getCreatedAt(postId) {
  const post = await DataStore.query(Post, postId);
  return String(post.createdAt);
}
