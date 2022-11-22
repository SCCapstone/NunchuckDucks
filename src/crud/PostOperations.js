import { DataStore } from "aws-amplify";
/**
 * Creates a post and saves the new post in the backend
 * @param {String} username
 * @param {String} password
 * @param {Image} profilePicture
 * @param {String} bio
 */
export async function createPost(caption, photo, username, userId) {
  try {
    await DataStore.save(
      new Post({
        caption: caption,
        photo: photo,
        username: username,
        userId: userId,
      })
    );
    console.log(`Post ${post.id} successfully created.`);
  } catch (error) {
    console.error("Error saving post", error);
  }
}

/**
 * Queries the database for a specific post, then deletes that post
 * @param {Post} post
 */
export async function deletePost(post) {
  try {
    const postToDelete = await DataStore.query(post);
    DataStore.delete(postToDelete);
    console.log(`Deleted post ${post.id} successfully.`);
  } catch (error) {
    console.log("Error deleting post", error);
  }
}
