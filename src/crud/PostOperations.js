import { DataStore, SortDirection } from "aws-amplify";
import { Post } from "../models";
import { getUserId } from "./UserOperations";
/**
 * Creates a post and saves the new post in the backend
 * @param {String} username
 * @param {String} password
 * @param {Image} profilePicture
 * @param {String} bio
 */
export async function createPost(caption, photo, username, userID) {
  try {
    await DataStore.save(
      new Post({
        caption: caption,
        photo: photo,
        username: username,
        userID: userID,
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

    const usersFollowed = await DataStore.query(Follows, (uf) => uf.userID("eq", userId));

    console.log(`Retrieved users followed for ${username}`);

    const usersFollowedIDs = [];

    for (let i = 0; i < usersFollowed.length; i++) {
      let usersFollowedID = await getUserId(usersFollowed[i].username);
      usersFollowedIDs.push(usersFollowedID);
    }

    const posts = [];

    for (let i = 0; i < usersFollowedIDs.length; i++) {
      let postsToBeAdded = DataStore.query(Post, (p) => p.userID("eq", usersFollowedIDs[i]), {
        sort: (s) => s.createdAt(SortDirection.DESCENDING)
      });
      posts.push(postsToBeAdded);
    }

    console.log(`Retrieved posts for user ${username}'s mutual page successfully.`);

    return posts;
  } catch (error) {
    console.error(`Error retrieving posts for ${username}'s mutual feed`);
  }
}

