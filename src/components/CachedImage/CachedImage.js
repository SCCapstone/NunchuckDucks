import { useEffect, useState } from "react";
import { Image } from "react-native";
import {
  getImageFromCache,
  cacheImageFromAWS,
  getImageFromAWS,
  updatePfpCache,
  cacheUriForImageFromAWS,
  getPfpNeedsCaching,
  cacheImage,
  cacheLastModified,
  getLastModifiedAWS,
  cachePfpNeedsCaching,
} from "../../crud/CacheOperations";
import FastImage from "react-native-fast-image";

export default function CachedImage({
  username,
  picName,
  imageStyle,
  resizeMode = "cover",
  isPfp = false,
  shouldBeCached = true,
  refresh,
  setRefresh,
}) {
  const [imageUri, setImageUri] = useState(null);
  const [uriIsSet, setUriIsSet] = useState(false);
  async function getOrSetImageFromCache() {
    // TODO retrieve post picture from the passed entry fileName
    //const postPfp = await getImageFromCache(username, "pfp.png"); // console logs pic "pfp.png found for user x..."
    let uriFromCache = await getImageFromCache(username, picName);
    if (uriFromCache !== "") {
      setImageUri(uriFromCache);
    } else {
      let newlyCachedUri = await cacheImageFromAWS(username, picName);
      if (newlyCachedUri !== "") {
        setImageUri(newlyCachedUri);
      }
    }
  }
  async function updatePfpVersion() {
    let uri = await updatePfpCache(username);
    setImageUri(uri);
  }

  async function setImageFromAWS() {
    let uriFromCache = await getImageFromCache(username, picName);
    if (uriFromCache === "") {
      uriFromCache = await cacheImageFromAWS(username, picName);
    }
    //let uriFromS3 = await getImageFromAWS(username, picName);
    setImageUri(uriFromCache);
    setUriIsSet(true);
  }
  async function updatePfp() {
    const pfpNeedsCaching = await getPfpNeedsCaching(username);
    if (pfpNeedsCaching === "true") {
      let newUri = await cacheImageFromAWS(username, "pfp.png");
      const lastModifiedAWS = await getLastModifiedAWS(username, "pfp.png");
      await cacheLastModified(username, lastModifiedAWS);
      await cachePfpNeedsCaching(username, "false");
      setImageUri(newUri);
      setUriIsSet(true);
    } else {
      let uriFromCache = await getImageFromCache(username, "pfp.png");
      setImageUri(uriFromCache);
      setUriIsSet(true);
    }
  }

  useEffect(() => {
    console.log("refreshing");
    if (isPfp) {
      updatePfp();
    } else {
      setImageFromAWS();
    }
    /*if (shouldBeCached === true) {
      if (isPfp === true) {
        updatePfpVersion();
      } else {
        getOrSetImageFromCache();
      }
    } else {
      setImageFromAWS();
    }*/
  }, [refresh]);
  return (
    uriIsSet && (
      <FastImage
        source={{
          uri: imageUri,
          headers: {
            /*FastImage.cacheControl.cacheOnly when no network available? */
          },
          priority: FastImage.priority.normal,
        }}
        style={imageStyle}
        resizeMode={FastImage.resizeMode.cover}
      />
    )
  ); //<Image source={{ uri: imageUri }} style={imageStyle} resizeMode={resizeMode} />;
}
