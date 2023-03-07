import { useEffect } from "react";
import { Image } from "react-native";
import { getImageFromCache, cacheImageFromAWS } from "../../crud/CacheOperations";

export default function CachedImage(username, picName, imageStyle, resizeMode = "cover", checkForUpdate = false) {
  const [imageUri, setImageUri] = useState("");

  async function getImage() {
    // TODO retrieve post picture from the passed entry fileName
    //const postPfp = await getImageFromCache(username, "pfp.png"); // console logs pic "pfp.png found for user x..."
    const uriFromCache = await getImageFromCache(username, picName);
    if (uriFromCache !== "") {
      setImageUri(uriFromCache);
    } else {
      let newlyCachedUri = await cacheImageFromAWS(username, picName);
      //let picha = await Storage.get(photoStr);
      setImageUri(newlyCachedUri);
    }
  }
  useEffect(() => {
    getImage();
  }, []);
  return <Image source={{ uri: imageUri }} style={imageStyle} resizeMode={resizeMode} />;
}
