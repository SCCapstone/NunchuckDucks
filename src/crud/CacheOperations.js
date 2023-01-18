import { DataStore, API, Amplify } from "aws-amplify";
import * as FileSystem from "expo-file-system";
import { Auth } from "aws-amplify";
import Storage from "@aws-amplify/storage";

const cacheDirectory = FileSystem.cacheDirectory;

export async function getCacheLastModifiedUri(username) {
  return cacheDirectory + username + "lastModified.txt";
}

export async function getCacheImageFileUri(username) {
  return cacheDirectory + username + "pfp.png";
}

export async function cacheLastModified(username, lastModifiedMessage) {
  const cacheLastModifiedUri = cacheDirectory + username + "lastModified.txt";
  await FileSystem.writeAsStringAsync(
    cacheLastModifiedUri,
    lastModifiedMessage,
    {
      encoding: "utf8",
    }
  );
}

export async function getLastModifiedCache(username) {
  const cacheLastModifiedUri = cacheDirectory + username + "lastModified.txt";
  let lastModified = await FileSystem.readAsStringAsync(cacheLastModifiedUri, {
    encoding: "utf8",
  });
  return lastModified;
}

export async function getLastModifiedAWS(username) {
  let lastModified = null;
  const myInit = {
    queryStringParameters: {
      username: username, // OPTIONAL
    },
  };
  await API.get("getLastModified", "/getLastModified", myInit)
    .then((response) => {
      lastModified = response;
    })
    .catch((error) => {
      console.log("Error: " + error.response);
    });
  return lastModified;
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

export async function getImageFromCache() {
  const cacheImageFileUri = cacheDirectory + username + "pfp.png";
  let imageExistsInCache = await findFileInCache(cacheImageFileUri);
  if (imageExistsInCache.exists) {
    console.log("Profile pic exists in cache and will be displayed");
    return cacheImageFileUri;
  } else {
    return "";
  }
}

export async function cacheImageFromAWS(username) {
  const uriAWS = await Storage.get(username + "/pfp.png");
  const cacheImageFileUri = cacheDirectory + username + "pfp.png";
  //if uriAWS does not exist
  let cached = await cacheImage(uriAWS, cacheImageFileUri);
  if (cached.cached) {
    console.log("cached new pfp.png");
    return cached.path;
  } else {
    console.log("Error caching new pfp: ", cached.msg);
    return "";
  }
}

export async function saveImageToAWS(fileName, blob) {
  await Storage.put(fileName, blob);
}
