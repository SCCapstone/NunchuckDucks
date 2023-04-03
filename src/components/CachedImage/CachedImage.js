import { useEffect, useState } from "react";
import { getUriFromCache, cacheRemoteUri } from "../../crud/CacheOperations";
import FastImage from "react-native-fast-image";

export default function CachedImage({ username, picName, imageStyle, refresh, userPfp = false }) {
  const [imageUri, setImageUri] = useState(null);
  const [uriIsSet, setUriIsSet] = useState(false);

  async function setImageFromCacheOrAWS() {
    /*
    if (isPfp) {
      console.log("usr", username, "pic", picName);
    }*/
    let uriFromCache = await getUriFromCache(username, picName);
    /*
    if (isPfp) {
      console.log(uriFromCache);
    }*/
    if (uriFromCache === "") {
      uriFromCache = await cacheRemoteUri(username, picName);
    }
    setImageUri(uriFromCache);
    setUriIsSet(true);
  }

  useEffect(() => {
    /*
    if (isPfp) {
      console.log("IN CAHCED IMAGE");
    }*/
    setImageFromCacheOrAWS();
  }, [refresh]);
  let prioritee = FastImage.priority.normal;
  if (userPfp) {
    //console.log("Hi");
    // if this is the user's pfp, load it ASAP because I don't want the pfp to be empty for half a second when you swipe to profile screen
    // I don't really know if this makes it better at all but it was worth a shot
    prioritee = FastImage.priority.high;
  }

  return (
    uriIsSet && (
      <FastImage
        source={{
          uri: imageUri,
          headers: {},
          priority: prioritee,
        }}
        style={imageStyle}
        resizeMode={FastImage.resizeMode.cover}
      />
    )
  ); //<Image source={{ uri: imageUri }} style={imageStyle} resizeMode={resizeMode} />;
}
