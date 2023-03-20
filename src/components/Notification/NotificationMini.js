import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { grayThemeColor } from "../../library/constants";

const NotificationMini = ({ content, onDeleteHandler }) => {
    return (
      <View style={styles.container}>
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
      width: "83%", // following original figma designs
      backgroundColor: grayThemeColor,
      padding: 10,
      minHeight: 60,
      borderRadius: 10,
  
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
  
      margin: 10,
      left: 20,
    },
    text: {
      textAlign: "center",
      textAlignVertical: "center",
      width: "78%",
      fontSize: 17,
    },
    icon: {
      width: 64,
      height: 64,
    },
    imgContainer: {
      display: "flex",
      justifyContent: "space-around",
    },
  });

export default NotificationMini;