import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { grayThemeColor, blueThemeColor } from "../../library/constants";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

// Component that provides a short goal description and handles a custom click event
const GoalMini = ({ description, onDeleteHandler, onCompleteHandler, testID }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onCompleteHandler} style={styles.imgContainer} testID={testID}>
        <AntDesign name="check" size={40} />
      </Pressable>
      <Text style={styles.text}>{description}</Text>
      <Pressable onPress={onDeleteHandler} style={styles.imgContainer} testID={`${testID}.Delete`}>
        <AntDesign name="close" size={40} />
        {/*<Image
          source={require("../../../assets/icons/Gymbit_Icons_Black/X_Icon_Black.png")} // Placeholder Icon
          style={styles.icon}
          resizeMethod={"auto"}
  />*/}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "83%", // following original figma designs
    backgroundColor: grayThemeColor,
    padding: 10,
    borderColor: blueThemeColor,
    borderWidth: 3,
    minHeight: 60,
    borderRadius: 10,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    alignItems: "center",
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
  },
  imgContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
});

export default GoalMini;
