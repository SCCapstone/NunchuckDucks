import { useEffect, useState } from "react";
import { Image } from "react-native";
import { getUriFromCache, cacheRemoteUri } from "../../crud/CacheOperations";
import FastImage from "react-native-fast-image";

export default function CachedImage({ username, picName, imageStyle, resizeMode = "cover", isPfp = false, refresh }) {
  const [imageUri, setImageUri] = useState(null);
  const [uriIsSet, setUriIsSet] = useState(false);

  async function setImageFromAWS() {
    let uriFromCache = await getUriFromCache(username, picName);
    if (uriFromCache === "") {
      uriFromCache = await cacheRemoteUri(username, picName);
    }

    setImageUri(uriFromCache);
    setUriIsSet(true);
  }

  useEffect(() => {
    if (isPfp) {
      //setPfpFromCache();
      setImageFromAWS();
    } else {
      setImageFromAWS();
    }
  }, [refresh]);
  return (
    uriIsSet && (
      <FastImage
        source={{
          uri: imageUri,
          headers: {},
          priority: FastImage.priority.normal,
        }}
        style={imageStyle}
        resizeMode={FastImage.resizeMode.cover}
      />
    )
  ); //<Image source={{ uri: imageUri }} style={imageStyle} resizeMode={resizeMode} />;
}
