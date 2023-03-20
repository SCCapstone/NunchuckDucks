import { useEffect, useState } from "react";
import { Image } from "react-native";
import { getImageFromCache, cacheImageFromAWS, getImageFromAWS, updatePfpCache } from "../../crud/CacheOperations";
import FastImage from "react-native-fast-image";

export default function CachedImage({ username, picName, imageStyle, resizeMode = "cover", isPfp = false, shouldBeCached = true }) {
  const [imageUri, setImageUri] = useState(null);
  const [uriIsSet, setUriIsSet] = useState(false);
  async function getOrSetImageFromCache() {
    console.log("Hello", picName);
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
    let uriFromS3 = await getImageFromAWS(username, picName);
    setImageUri(uriFromS3);
    setUriIsSet(true);
  }
  useEffect(() => {
    setImageFromAWS();
    /*if (shouldBeCached === true) {
      if (isPfp === true) {
        updatePfpVersion();
      } else {
        getOrSetImageFromCache();
      }
    } else {
      setImageFromAWS();
    }*/
  }, []);
  /*<FastImage
        style={{ width: 200, height: 200 }}
        source={{
            uri: 'https://unsplash.it/400/400?image=1',
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    /> */
  return (
    uriIsSet && (
      <FastImage
        source={{
          uri: imageUri,
          cache: FastImage.cacheControl.cacheOnly,
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
