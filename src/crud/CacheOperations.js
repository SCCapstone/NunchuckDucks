import { API } from "aws-amplify";
import * as FileSystem from "expo-file-system";
import { Storage } from "@aws-amplify/storage";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";

const cacheDirectory = FileSystem.cacheDirectory;

export async function logCache() {
  let files = await getAllCachedFiles();
  console.log(files);
}
export async function deleteCachedFile(file) {
  try {
    const cachedFile = cacheDirectory + file;
    FileSystem.deleteAsync(cachedFile);
  } catch (error) {
    console.log("Error: Could not delete cached file", error);
  }
}

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
export async function deleteOldCache() {
  let postNames = await getPostsThatShouldBeCached();
  if (postNames === null) {
    console.log("No posts in cache, so there is no need to delete old cache");
  }
  // iterate through all files in cache and delete the pngs that are no longer in the post list
  let filesInCache = await getAllCachedFiles();
  for (let i = 0; i < filesInCache.length; i++) {
    let curr = filesInCache[i];
    if (curr.substring(curr.length - 3) === "png" && postNames.indexOf(curr) === -1) {
      await deleteCachedFile(curr);
      console.log("Deleted file", curr);
    } else if (!isNaN(curr.substring(curr.length - 1)) && postNames.indexOf(curr) === -1) {
      // this is for the old posts that don't have "png" at the end; they with in a number
      await deleteCachedFile(curr);
      console.log("Deleted file", curr);
    }
  }
}

export async function getAllCachedFiles() {
  let files = await FileSystem.readDirectoryAsync(cacheDirectory);
  return files;
}

export async function getCurrentUser() {
  let username = "";
  try {
    username = await getCachedCurrUser();
    if (username === undefined || username === null) {
      username = await getCurrentAuthenticatedUser();
    }
    return username;
  } catch (e) {
    console.log("Error: Could not retrieve username from cache nor from S3");
  }
}

export async function getCacheLastModifiedUri(username, ending) {
  return cacheDirectory + username + ending + "lastModified.txt";
}

export async function getCacheImageFileUri(username, ending) {
  return cacheDirectory + username + ending;
}

export async function cacheLastModified(username, lastModifiedMessage) {
  const cacheLastModifiedUri = cacheDirectory + username + "pfplastModified.txt";
  try {
    await FileSystem.writeAsStringAsync(cacheLastModifiedUri, lastModifiedMessage, {
      encoding: "utf8",
    });
  } catch (error) {
    console.log("Error: Could not cache last modified attribute", error);
  }
}

export async function getLastModifiedCache(username, ending) {
  const cacheLastModifiedUri = cacheDirectory + username + ending + "lastModified.txt";
  try {
    let lastModified = await FileSystem.readAsStringAsync(cacheLastModifiedUri, {
      encoding: "utf8",
    });
    return lastModified;
  } catch (e) {
    console.log("Could not find lasttModified for", username);
  }
}

export async function getPostsFromCache() {
  try {
    let files = await FileSystem.readDirectoryAsync(cacheDirectory);
    const cachedPostsUri = cacheDirectory + "posts.txt";
    let postsString = await FileSystem.readAsStringAsync(cachedPostsUri, { encoding: "utf8" });
    let posts = JSON.parse(postsString);
    return posts;
  } catch (e) {
    console.log("Error: Posts could not be read from cache", e);
    return [];
  }
}

export async function getCachedCurrUser() {
  try {
    const cachedUserUri = cacheDirectory + "currUser.txt";
    const cachedUserString = await FileSystem.readAsStringAsync(cachedUserUri, { encoding: "utf8" });
    return cachedUserString;
  } catch (e) {
    console.log("Error: Could not read who the current user is from cache", e);
    return null;
  }
}

export async function cacheCurrUser() {
  const cachedUserUri = cacheDirectory + "currUser.txt";
  try {
    const username = await getCurrentAuthenticatedUser();
    let cachedUsername = await FileSystem.writeAsStringAsync(cachedUserUri, username, { encoding: "utf8" });
    return username;
  } catch (e) {
    console.log("Error: Could not cache username from backend", e);
  }
}

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

export async function getLastModifiedAWS(username, file) {
  let lastModified = null;
  const myInit = {
    queryStringParameters: {
      username: username, // OPTIONAL
      file: file,
    },
  };
  await API.get("getLastModified", "/getLastModified", myInit)
    .then((response) => {
      lastModified = response;
    })
    .catch((error) => {
      console.log("Error: could not get last modified using API call" + error.response);
    });
  return lastModified;
}

export async function cachePostsThatShouldBeCached(posts) {
  const cachedPostsUri = cacheDirectory + "postsCached.txt";
  try {
    let postsString = posts.toString();
    let po = await FileSystem.writeAsStringAsync(cachedPostsUri, postsString, {
      encoding: "utf8",
    });
  } catch (error) {
    console.log("Error: Could not cache posts that should be cached (for old cache deletion)");
  }
}

export async function getPostsThatShouldBeCached() {
  try {
    const cachedPostsUri = cacheDirectory + "postsCached.txt";
    let cachedPostsString = await FileSystem.readAsStringAsync(cachedPostsUri, { encoding: "utf8" });
    let cachedPostsArray = cachedPostsString.split(",");
    return cachedPostsArray;
  } catch (e) {
    console.log("Error: Could not read what the cached posts are supposed to be", e);
    return null;
  }
}
/*function setLastModifed(lastModified) {

  }*/

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
export async function getImage(username, ending) {
  let image = "";
  image = await getImageFromCache(username, ending);
  if (image === "") {
    image = Storage.get(username + "/" + ending);
  }
  return image;
}
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

export async function cacheImageFromAWS(username, ending, addPng = false) {
  const uriAWS = await Storage.get(username + "/" + ending);
  //console.log(uriAWS);
  let cacheImageFileUri = cacheDirectory + username + ending;
  /*if ((addPng = true)) {
    cacheImageFileUri = cacheImageFileUri + ".png";
  }*/
  //if uriAWS does not exist
  let cached = await cacheImage(uriAWS, cacheImageFileUri);
  if (cached.cached) {
    return cached.path;
  } else {
    console.log("Error: Could not cache new pic", ending, ":", cached.msg);
    return "";
  }
}

export async function saveImageToAWS(fileName, blob) {
  await Storage.put(fileName, blob);
}

export async function updatePfpCache(username) {
  const cachedImage = await getImageFromCache(username, "pfp.png");
  // we are assuming that if the image exists in client then it should exist in the backend as well
  if (cachedImage !== "") {
    const lastModifiedAWS = await getLastModifiedAWS(username, "pfp.png");
    const lastModifiedCache = await getLastModifiedCache(username, "pfp");
    if (lastModifiedCache !== null) {
      if (lastModifiedAWS > lastModifiedCache) {
        //lastModifiedAWS has a higher alphabetical order (newer) than lastModifiedCache
        await cacheImageFromAWS(username, "pfp.png");
        await cacheLastModified(username, lastModifiedAWS);
      } else if (lastModifiedCache < lastModifiedAWS) {
        let fileName = username + "/pfp.png";
        saveImageToAWS(fileName, getCacheImageFileUri(username, "pfp.png"));
      } else {
      }
    } else {
      await cacheImageFromAWS(username, "pfp.png");
      await cacheLastModified(username, lastModifiedAWS);
    }
  } else {
    console.log("Profile pic for", username, "not found in cache; checking if it is in the backend");
    const lastModifiedAWS = await getLastModifiedAWS(username, "pfp.png");
    if (lastModifiedAWS === "None" || lastModifiedAWS === null) {
      return false;
    } else {
      let imageFromAWS = await cacheImageFromAWS(username, "pfp.png");
      await cacheLastModified(username, lastModifiedAWS);
    }
  }
}
