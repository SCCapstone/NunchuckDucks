import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { grayThemeColor } from "../../library/constants";
import React from "react";

// Component that provides a short goal description and handles a custom click event
export default function GoalMini({ description, onEditHandler }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
      <Pressable onPress={onEditHandler} style={styles.imgContainer}>
        <Image
          source={require("../../../assets/icons/Settings_Icon.png")} // Placeholder Icon
          style={styles.icon}
          resizeMethod={"auto"}
        />
      </Pressable>
    </View>
  );
}

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