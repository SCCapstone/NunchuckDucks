import { Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import CachedImage from "../CachedImage/CachedImage";
import { getUriFromCache, cacheRemoteUri } from "../../crud/CacheOperations";
import FastImage from "react-native-fast-image";

const defaultProfile = require("../../../assets/icons/Gymbit_Icons_Black/Profile_Icon.png");

const ProfileMini = ({ style, onClick, imageStyle, username }) => {
  console.log("in profilemini of", username);
  let containerStyles = { ...styles.container, ...style };
  let imageStyles = { ...styles.image, ...imageStyle };
  let picName = "pfp.png";
  const [imageUri, setImageUri] = useState(null);
  const [uriIsSet, setUriIsSet] = useState(false);

  async function setImageFromCacheOrAWS() {
    let uriFromCache = await getUriFromCache(username, picName);
    console.log("Got uriFromCache for", username);
    console.log("The first 10 chars of the uri are", uriFromCache.substring(0, 10));
    if (uriFromCache === "") {
      uriFromCache = await cacheRemoteUri(username, picName);
    }
    setImageUri(uriFromCache);
    setUriIsSet(true);
  }
  useEffect(() => {
    setImageFromCacheOrAWS();
  });
  return (
    <Pressable onPressOut={onClick} style={containerStyles}>
      <Image style={imageStyles} resizeMode={"contain"} source={defaultProfile}></Image>
      {uriIsSet && (
        <FastImage
          source={{
            uri: imageUri,
            headers: {},
            priority: FastImage.priority.high,
          }}
          style={imageStyles}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  image: {
    width: 80,
    height: 80,
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 100,
  },
});

export default ProfileMini;
