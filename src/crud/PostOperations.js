import { processCompositeKeys } from "@aws-amplify/datastore/lib-esm/util";
import { DataStore, SortDirection } from "aws-amplify";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";
import { Post, Follows } from "../models";
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
    const user = await getCurrentAuthenticatedUser();

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

export async function getPostsForMutualFeed(username) {
  try {
    const userId = await getUserId(username);

    const usersFollowed = await DataStore.query(Follows, (uf) =>
      uf.username.eq(username)
    );
    const usersFollowedIDs = [userId];

    console.log(`Retrieved users followed for ${username}`);

    for (let i = 0; i < usersFollowed.length; i++) {
      usersFollowedIDs.push(usersFollowed[i].userID);
    }

    const posts = [];

    for (let i = 0; i < usersFollowedIDs.length; i++) {
      let postsToBeAdded = await DataStore.query(
        Post,
        (p) => p.userID.eq(usersFollowedIDs[i]),
        {
          sort: (s) => s.createdAt(SortDirection.DESCENDING),
        }
      );
      for (let j = 0; j < postsToBeAdded.length; j++) {
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

    console.log(
      `Retrieved posts for user ${username}'s mutual page successfully.`
    );

    return posts;
  } catch (error) {
    console.error(
      `Error retrieving posts for ${username}'s mutual feed, ${error}`
    );
  }
}
