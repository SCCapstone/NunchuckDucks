import { DataStore, API, Amplify } from "aws-amplify";
import * as FileSystem from "expo-file-system";
import { Auth } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";

const cacheDirectory = FileSystem.cacheDirectory;

export async function deleteCachedFile(file) {
  try {
    const cachedFile = cacheDirectory + file;
    FileSystem.deleteAsync(cachedFile);
    console.log("Success: deleted cached file");
  } catch (error) {
    console.log("Error: Could not delete cached file", error);
  }
}

export async function getAllCachedFiles() {
  let files = await FileSystem.readDirectoryAsync(cacheDirectory);
  return files;
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
    console.log("Success: cached lastModified attribute");
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
    console.log("filichkas", files);
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
    console.log(cacheDirectory);
    const cachedUserUri = cacheDirectory + "currUser.txt";
    let cachedUserString = await FileSystem.readAsStringAsync(cachedUserUri, { encoding: "utf8" });
    return cachedUserString;
  } catch (e) {
    console.log("Could not read who the current user is from cache", e);
    return null;
  }
}

export async function cacheCurrUser() {
  const cachedUserUri = cacheDirectory + "currUser.txt";
  try {
    const username = await getCurrentAuthenticatedUser();
    let cachedUsername = await FileSystem.writeAsStringAsync(cachedUserUri, username, { encoding: "utf8" });
    console.log("Success: cached username of logged in user");
    return username;
  } catch (e) {
    console.log("Could not cache username from backend", e);
  }
}

export async function cachePosts(posts) {
  const cachedPostsUri = cacheDirectory + "posts.txt";
  try {
    let postsString = JSON.stringify(posts);
    let po = await FileSystem.writeAsStringAsync(cachedPostsUri, postsString, {
      encoding: "utf8",
    });
    console.log("Success: cached posts");
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
      console.log("Success: got lastModified from AWS for", file);
    })
    .catch((error) => {
      console.log("Error: could not get last modified" + error.response);
    });
  return lastModified;
}

export async function cachePostsThatShouldBeCached(posts) {
  const cachedPostsUri = cacheDirectory + "postsCached.txt";
  try {
    let postsString = toString(posts);
    let po = await FileSystem.writeAsStringAsync(cachedPostsUri, postsString, {
      encoding: "utf8",
    });
    console.log("Success: cached posts that should be cached (for old cache deletion)");
  } catch (error) {
    console.log("Error: Could not cache posts that should be cached (for old cache deletion)");
  }
}

export async function getPostsThatShouldBeCached() {
  try {
    const cachedPostsUri = cacheDirectory + "postsCached.txt";
    let cachedPostsString = await FileSystem.readAsStringAsync(cachedPostsUri, { encoding: "utf8" });
    return cachedPostsString;
  } catch (e) {
    console.log("Could not read what the cached posts are supposed to be", e);
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

export async function getImageFromCache(username, ending) {
  const cacheImageFileUri = cacheDirectory + username + ending;
  let imageExistsInCache = "";
  try {
    imageExistsInCache = await findFileInCache(cacheImageFileUri);
  } catch (error) {
    console.log(error);
  }
  if (imageExistsInCache.exists) {
    console.log("Pic", ending, "for", username, "exists in cache and will be displayed");
    return cacheImageFileUri;
  } else {
    console.log("Pic", ending, "for", username, " does not exist");
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
    console.log("Success: cached new " + ending);
    return cached.path;
  } else {
    console.log("Error caching new pic", ending, ":", cached.msg);
    return "";
  }
}

export async function saveImageToAWS(fileName, blob) {
  await Storage.put(fileName, blob);
}

export async function updatePfpCache(username) {
  const cachedImage = await getImageFromCache(username, "pfp.png");
  console.log("this", cachedImage, "is the hopefully cached pfp for", username);
  // we are assuming that if the image exists in client then it should exist in the backend as well
  if (cachedImage !== "") {
    console.log("Profile pic for", username, "found in cache; checking if it is the most recent version");
    const lastModifiedAWS = await getLastModifiedAWS(username, "pfp.png");
    const lastModifiedCache = await getLastModifiedCache(username, "pfp");
    if (lastModifiedCache !== null) {
      if (lastModifiedAWS > lastModifiedCache) {
        //lastModifiedAWS has a higher alphabetical order (newer) than lastModifiedCache
        console.log("lastModifiedAWS found to be newer than lastModifiedCache; updating pfp and lastModified");
        await cacheImageFromAWS(username, "pfp.png");
        await cacheLastModified(username, lastModifiedAWS);
      } else if (lastModifiedCache < lastModifiedAWS) {
        console.log("lastModifiedCache found to be newer than lastModifiedAWS; updating pfp in the backend");
        let fileName = username + "/pfp.png";
        saveImageToAWS(fileName, getCacheImageFileUri(username, "pfp.png"));
      } else {
        console.log("lastModifiedCache matches lastModifiedAWS; nothing to be done");
      }
    } else {
      console.log("lastModified file not found; caching lastModified val found in AWS and updating pic just in case");
      await cacheImageFromAWS(username, "pfp.png");
      await cacheLastModified(username, lastModifiedAWS);
    }
  } else {
    console.log("Profile pic not found in cache; checking if it is in the backend");
    const lastModifiedAWS = await getLastModifiedAWS(username, "pfp.png");
    if (lastModifiedAWS === "None") {
      console.log("no pfp found in backend for", username);
    } else {
      console.log("pfp was found in backend; caching pfp and lastModified val");
      let imageFromAWS = await cacheImageFromAWS(username, "pfp.png");
      await cacheLastModified(username, lastModifiedAWS);
    }
  }
}
