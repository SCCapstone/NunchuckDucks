import { Image, StyleSheet, Pressable } from "react-native";

const defaultProfile = require("../../../assets/icons/Gymbit_Icons_Black/Profile_Icon.png");

const ProfileMini = ({ style, src, onClick, imageStyle }) => {
  let containerStyles = { ...styles.container, ...style };
  let imageStyles = { ...styles.image, ...imageStyle };

  return (
    <Pressable onPressOut={onClick} style={containerStyles}>
      <Image
        style={imageStyles}
        resizeMode={"contain"}
        source={defaultProfile}
      ></Image>
      <Image
        style={imageStyles}
        resizeMode={"center"}
        source={{
          uri: src,
        }}
      ></Image>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  image: {
    width: 60,
    height: 60,
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 100,
  },
});

export default ProfileMini;
