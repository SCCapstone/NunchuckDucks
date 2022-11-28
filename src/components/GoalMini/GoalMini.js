import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { grayThemeColor } from "../../library/constants";
import React from "react";

// Component that provides a short goal description and handles a custom click event
const GoalMini = ({ description, onEditHandler }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
      <Pressable onPress={onEditHandler} style={styles.imgContainer}>
        <Image
          source={require("../../../assets/icons/Gymbit_Icons_Black/Edit_Icon_Black.png")} // Placeholder Icon
          style={styles.icon}
          resizeMethod={"auto"}
        />
      </Pressable>
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

export default GoalMini;
