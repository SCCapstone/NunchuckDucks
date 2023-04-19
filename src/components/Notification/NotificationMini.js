import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import ProfileMini from "../ProfileMini/ProfileMini";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { grayThemeColor, blueThemeColor } from "../../library/constants";

const NotificationMini = ({ content, onDeleteHandler, username }) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <View
      style={
        isHidden ? { ...styles.container, display: "none" } : styles.container
      }
    >
      <ProfileMini username={username} />
      <Text style={styles.text}>{content}</Text>
      <TouchableOpacity
        onPress={() => {
          setIsHidden(true);
          onDeleteHandler();
        }}
        style={styles.imgContainer}
      >
        <AntDesign name="closecircleo" color={blueThemeColor} size={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%", // following original figma designs
    backgroundColor: grayThemeColor,
    padding: 10,
    minHeight: 60,
    borderRadius: 10,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",

    margin: 10,
    left: 0,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    width: "60%",
    fontSize: 17,
  },
  icon: {
    width: 64,
    height: 64,
    right: 8,
  },
  imgContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
});

export default NotificationMini;
