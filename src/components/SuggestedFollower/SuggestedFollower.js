import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

import CustomButton from "../CustomButton";
import ProfileMini from "../ProfileMini";
import { blueThemeColor } from "../../library/constants";
import { getImageFromCache } from "../../crud/CacheOperations";

const SuggestedFollower = ({ username, addNewFollower }) => {
  const [pfp, setPfp] = useState("");

  useEffect(() => {
    async function getPic() {
      try {
        let pfps3 = await getImageFromCache(username, "pfp.png");
        if (pfps3 === "") {
          pfps3 = await Storage.get(username + "/pfp.png");
        }
        setPfp(pfps3);
      } catch (error) {
        console.log("Error retrieving pfp in comment: " + error);
      }
    }
    getPic();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ProfileMini src={pfp}></ProfileMini>
        <Text style={styles.textStyles}>{username}</Text>
      </View>
      <CustomButton
        text={"Follow"}
        style={{ width: "30%", marginRight: 5 }}
        onClick={addNewFollower.bind(this, username)}
      ></CustomButton>
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
