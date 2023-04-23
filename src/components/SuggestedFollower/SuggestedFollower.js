import { View, StyleSheet, Text } from "react-native";
import React from "react";

import CustomButton from "../CustomButton";
import ProfileMini from "../ProfileMini";
import { blueThemeColor } from "../../library/constants";

const SuggestedFollower = ({ username, addNewFollower, testID }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ProfileMini username={username} />
        <Text style={styles.textStyles}>{username}</Text>
      </View>
      <CustomButton text={"Follow"} style={{ width: "30%", marginRight: 5 }} onClick={addNewFollower.bind(this, username)} testID={`${testID}.Follow_Button`}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
    height: 100,
    backgroundColor: "white",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 2,
  },
  textStyles: {
    color: blueThemeColor,
    paddingLeft: 5,
  },
});

export default SuggestedFollower;
