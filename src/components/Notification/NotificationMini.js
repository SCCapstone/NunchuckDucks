import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { grayThemeColor } from "../../library/constants";
import ProfileMini  from "../ProfileMini/ProfileMini";
import { useState, useEffect } from "react";
import { getImageFromCache } from "../../crud/CacheOperations";
import { Storage } from "aws-amplify";

const NotificationMini = ({ content, onDeleteHandler, username }) => {
  const [userImageSrc, setUserImageSrc] = useState("");

  async function getUserImageSrc(username) {
    let pfp = await getImageFromCache(username, "pfp.png");
    if (pfp === "") {
      pfp = await Storage.get(username + "/pfp.png");
    }
    setUserImageSrc(pfp);
  }

  useEffect(() => {
    getUserImageSrc(username);
  }, [username]);

    return (
      <View style={styles.container}>
        <ProfileMini src={userImageSrc}  />
        <Text style={styles.text}>{content}</Text>
        <TouchableOpacity onPress={onDeleteHandler} style={styles.imgContainer}>
          <Image
            source={require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png")} // Placeholder Icon
            style={styles.icon}
            resizeMethod={"auto"}
          />
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