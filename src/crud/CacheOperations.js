import * as FileSystem from "expo-file-system";
import { Storage } from "@aws-amplify/storage";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";

const cacheDirectory = FileSystem.cacheDirectory;

/**
 * @param {String} file file that should be deleted.
 **/
export async function deleteCachedFile(file) {
  try {
    const cachedFile = cacheDirectory + file;
    FileSystem.deleteAsync(cachedFile);
  } catch (error) {
    console.log("Error: Could not delete cached file", error);
  }
}

/**
 * Deletes all files in cache system
 */
export async function deleteAllCache() {
  try {
    console.log("Attempting to delete all cached files");
    let filesInCache = await getAllCachedFiles();
    //await FileSystem.deleteAsync(cacheDirectory);
    for (let i = 0; i < filesInCache.length; i++) {
      let curr = filesInCache[i];
      if (
        curr.substring(curr.length - 3) === "png" ||
        curr.substring(curr.length - 3) === "txt" ||
        !isNaN(curr.substring(curr.length - 1))
      ) {
        await deleteCachedFile(curr);
      }
    }
  } catch (e) {
    console.log("Error: Could not delete all cached files", e);
  }
}

/**
 * Deletes out of date cache
 */
export async function deleteOldCache() {
  let postNames = await getPostsThatShouldBeCached();
  if (postNames === null) {
    console.log("No posts in cache, so there is no need to delete old cache");
  }
  // iterate through all files in cache and delete the pngs that are no longer in the post list
  let filesInCache = await getAllCachedFiles();
  for (let i = 0; i < filesInCache.length; i++) {
    let curr = filesInCache[i];
    if (
      curr.substring(curr.length - 3) === "png" &&
      postNames.indexOf(curr) === -1
    ) {
      await deleteCachedFile(curr);
      console.log("Deleted file", curr);
    } else if (
      !isNaN(curr.substring(curr.length - 1)) &&
      postNames.indexOf(curr) === -1
    ) {
      // this is for the old posts that don't have "png" at the end; they with in a number
      await deleteCachedFile(curr);
      console.log("Deleted file", curr);
    }
  }
}
/**
 * gets all cached files and 
 * @returns files
 */
export async function getAllCachedFiles() {
  let files = await FileSystem.readDirectoryAsync(cacheDirectory);
  return files;
}

/**
 * gets the current user
 * @returns username
 */
export async function getCurrentUser() {
  let username = "";
  try {
    username = await getCachedCurrUser();
    if (!username) {
      username = await getCurrentAuthenticatedUser();
    }
    return username;
  } catch (e) {
    console.log("Error: Could not retrieve username from cache nor from S3");
    return "";
  }
}
/**
 * @param {String} username username for the user to cache last changed message
 * @param {String} lastModifiedMessage the last modified message
 */
export async function cacheLastModified(username, lastModifiedMessage) {
  const cacheLastModifiedUri =
    cacheDirectory + username + "pfplastModified.txt";
  try {
    await FileSystem.writeAsStringAsync(
      cacheLastModifiedUri,
      lastModifiedMessage,
      {
        encoding: "utf8",
      }
    );
  } catch (error) {
    console.log("Error: Could not cache last modified attribute", error);
  }
}

/**
 * 
 * @param {String} username username of user
 * @param {String} fileName filename of the file to cache
 * @returns remoteUri
 */
export async function cacheRemoteUri(username, fileName) {
  const cacheLastModifiedUri = cacheDirectory + username + fileName + "Uri.txt";
  let remoteUri = await Storage.get(username + "/" + fileName);
  try {
    let cachedRemoteUri = await FileSystem.writeAsStringAsync(
      cacheLastModifiedUri,
      remoteUri,
      {
        encoding: "utf8",
      }
    );
    return remoteUri;
  } catch (error) {
    console.log("Error: Could not cache pfp uri", error);
    return "";
  }
}

/**
 * 
 * @param {String} username username of the user
 * @param {String} fileName filename of file we are getting from cache
 * @returns blah aka complete Uri from cache
 */
export async function getUriFromCache(username, fileName) {
  const cacheLastModifiedUri = cacheDirectory + username + fileName + "Uri.txt";
  try {
    let blah = await FileSystem.readAsStringAsync(cacheLastModifiedUri, {
      encoding: "utf8",
    });
    return blah;
  } catch (error) {
    console.log("Error: Could not get uri from cache", error);
    return "";
  }
}

/**
 * 
 * @param {String} username username of the user
 * @param {String} ending 
 * @returns lastModified cached item
 */
export async function getLastModifiedCache(username, ending) {
  const cacheLastModifiedUri =
    cacheDirectory + username + ending + "lastModified.txt";
  try {
    let lastModified = await FileSystem.readAsStringAsync(
      cacheLastModifiedUri,
      {
        encoding: "utf8",
      }
    );
    return lastModified;
  } catch (e) {
    console.log("Could not find lastModified for", username);
    return "";
  }
}

/**
 * gets posts in the cache 
 * @returns posts
 */
export async function getPostsFromCache() {
  try {
    let files = await FileSystem.readDirectoryAsync(cacheDirectory);
    const cachedPostsUri = cacheDirectory + "posts.txt";
    let postsString = await FileSystem.readAsStringAsync(cachedPostsUri, {
      encoding: "utf8",
    });
    let posts = JSON.parse(postsString);
    return posts;
  } catch (e) {
    console.log("Error: Posts could not be read from cache", e);
    return [];
  }
}

/**
 * function to get the curr cached user.
 * @returns cachedUserString
 */
export async function getCachedCurrUser() {
  try {
    const cachedUserUri = cacheDirectory + "currUser.txt";
    const cachedUserString = await FileSystem.readAsStringAsync(cachedUserUri, {
      encoding: "utf8",
    });
    return cachedUserString;
  } catch (e) {
    console.log("Error: Could not read who the current user is from cache", e);
    return "";
  }
}

/**
 * function to cach the current user and username
 * @returns username
 */
export async function cacheCurrUser() {
  const cachedUserUri = cacheDirectory + "currUser.txt";
  try {
    const username = await getCurrentAuthenticatedUser();
    let cachedUsername = await FileSystem.writeAsStringAsync(
      cachedUserUri,
      username,
      { encoding: "utf8" }
    );
    return username;
  } catch (e) {
    console.log("Error: Could not cache username from backend", e);
  }
}

/**
 * function to cache posts 
 * @param {String} posts 
 */
export async function cachePosts(posts) {
  const cachedPostsUri = cacheDirectory + "posts.txt";
  try {
    let postsString = JSON.stringify(posts);
    let po = await FileSystem.writeAsStringAsync(cachedPostsUri, postsString, {
      encoding: "utf8",
    });
  } catch (error) {
    console.log("Error: Could not cache posts");
  }
}

/**
 * function that returns a list of posts that should be cached
 * @returns cachedPostsArray
 */
export async function getPostsThatShouldBeCached() {
  try {
    const cachedPostsUri = cacheDirectory + "postsCached.txt";
    let cachedPostsString = await FileSystem.readAsStringAsync(cachedPostsUri, {
      encoding: "utf8",
    });
    let cachedPostsArray = cachedPostsString.split(",");
    return cachedPostsArray;
  } catch (e) {
    console.log(
      "Error: Could not read what the cached posts are supposed to be",
      e
    );
    return null;
  }
}

/**
 * 
 * @param {String} uri 
 * @returns info if file exits, else exists (boolean) and the error msg
 */
export async function findFileInCache(uri) {
  try {
    let info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}

/**
 * 
 * @param {String} uri 
 * @param {String} cacheUri 
 * @returns path of img uri, and cached booloen with errors if applicable
 */
export async function cacheImage(uri, cacheUri) {
  try {
    const downloadImage = FileSystem.createDownloadResumable(uri, cacheUri);
    const downloaded = await downloadImage.downloadAsync();
    return {
      cached: true,
      err: false,
      path: downloaded.uri,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
}

/**
 * 
 * @param {String} username 
 * @param {String} ending 
 * @returns image
 */
export async function getImage(username, ending) {
  let image = "";
  image = await getImageFromCache(username, ending);
  if (image === "") {
    image = Storage.get(username + "/" + ending);
  }
  return image;
}

/**
 * 
 * @param {String} username 
 * @param {String} ending 
 * @returns cacheImageFileUri
 */
export async function getImageFromCache(username, ending) {
  const cacheImageFileUri = cacheDirectory + username + ending;
  let imageExistsInCache = "";
  try {
    imageExistsInCache = await findFileInCache(cacheImageFileUri);
  } catch (error) {
    console.log(error);
  }
  if (imageExistsInCache.exists) {
    return cacheImageFileUri;
  } else {
    console.log("Pic", ending, "for", username, " does not exist in cache");
    return "";
  }
}

/**
 * 
 * @param {String} username username string
 * @param {String} ending of the file grabbing
 * @returns  uriAWS
 */
export async function getImageFromAWS(username, ending) {
  try {
    const uriAWS = await Storage.get(username + "/" + ending);
    return uriAWS;
  } catch (e) {
    console.log(
      "Error: could not get image",
      ending,
      "for",
      username,
      "from aws",
      e
    );
    return null;
  }
}

/**
 * 
 * @param {String} username of user
 * @param {String} ending of file path
 * @returns uriAWS (cached uri for image/file)
 */
export async function cacheUriForImageFromAWS(username, ending) {
  try {
    const uriAWS = await Storage.get(username + "/" + ending);
    const cacheFile = cacheDirectory + username + ending + "uri.txt";
    await cacheImage(uriAWS, cacheFile);
    return uriAWS;
  } catch (e) {
    console.log(
      "Error: could not get image",
      ending,
      "for",
      username,
      "from aws",
      e
    );
    return null;
  }
}

/**
 * 
 * @param {String} username of user
 * @param {String} ending of file/image path 
 * @returns cached.path which is the path of the cached img from AWS
 */
export async function cacheImageFromAWS(username, ending) {
  const uriAWS = await Storage.get(username + "/" + ending);

  let cacheImageFileUri = cacheDirectory + username + ending;
  let cached = await cacheImage(uriAWS, cacheImageFileUri);
  if (cached.cached) {
    return cached.path;
  } else {
    console.log("Error: Could not cache new pic", ending, ":", cached.msg);
    return "";
  }
}

/**
 * 
 * @param {String} fileName 
 * @param {String} blob 
 * @returns boolean if img was stored or not.
 */
export async function saveImageToAWS(fileName, blob) {
  try {
    await Storage.put(fileName, blob);
    return true;
  } catch (e) {
    console.log("Error: Failed to upload image", fileName, "to AWS");
    return false;
  }
}

/**
 * 
 * @param {String} username of the user
 * @returns remoteUriAWS (cached uri of profile picture)
 */
export async function updatePfpCache(username) {
  let remoteUriAWS = await cacheRemoteUri(username, "pfp.png");
  return remoteUriAWS;
}
