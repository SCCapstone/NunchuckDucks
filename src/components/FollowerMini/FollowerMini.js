import { Pressable, Image, StyleSheet, View, Text } from "react-native";
import ProfileMini from "../ProfileMini";
import { grayThemeColor } from "../../library/constants";

const deleteIconPath = require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png");

const FollowerMini = ({
  userImageSrc,
  username,
  onProfileClick,
  onDelete,
  style,
}) => {
  const containerStyles = { ...styles.container, ...style };

  return (
    <View style={containerStyles}>
      <View style={styles.leftSideContainer}>
        <ProfileMini src={userImageSrc} onClick={onProfileClick}></ProfileMini>
        <Pressable onPressOut={onProfileClick} style={styles.usernameContainer}>
          <Text style={styles.username}>@{username}</Text>
        </Pressable>
      </View>
      <Pressable onPressOut={onDelete}>
        <Image
          source={deleteIconPath}
          resizeMode={"center"}
          style={styles.xIcon}
        ></Image>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: grayThemeColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",

    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  leftSideContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "80%",
  },
  usernameContainer: {
    maxWidth: "80%",
  },
  username: {
    textAlignVertical: "center",
    fontSize: 20,
    padding: 5,
    width: "100%",
  },
  xIcon: {
    width: 60,
    height: 60,
  },
});

export default FollowerMini;