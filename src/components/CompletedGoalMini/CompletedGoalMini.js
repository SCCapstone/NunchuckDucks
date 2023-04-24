import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

// Component that provides a short goal description and handles a custom click event
const CompletedGoalMini = ({ description, onDeleteHandler, testID }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >{description}</Text>
      <Pressable onPress={onDeleteHandler} style={styles.imgContainer} testID={testID}>
        <AntDesign name="closecircleo" color={blueThemeColor} size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "83%", // following original figma designs
    backgroundColor: grayThemeColor,
    borderColor: blueThemeColor,
    borderWidth: 3,
    padding: 10,
    minHeight: 60,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    width: "82%",
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

export default CompletedGoalMini;
