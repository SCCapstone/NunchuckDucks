import { Image, StyleSheet, Pressable } from "react-native";
import CachedImage from "../CachedImage/CachedImage";

const defaultProfile = require("../../../assets/icons/Gymbit_Icons_Black/Profile_Icon.png");

const ProfileMini = ({ style, onClick, imageStyle, username, refresh, setRefresh }) => {
  let containerStyles = { ...styles.container, ...style };
  let imageStyles = { ...styles.image, ...imageStyle };
  return (
    <Pressable onPressOut={onClick} style={containerStyles}>
      <Image style={imageStyles} resizeMode={"contain"} source={defaultProfile}></Image>
      <CachedImage
        username={username}
        picName={"pfp.png"}
        imageStyle={imageStyles}
        resizeMode={"contain"}
        isPfp={true}
        refresh={refresh}
        setRefresh={setRefresh}
      />
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
