import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getBio } from "../../crud/UserOperations";
import { getCurrentUser } from "../../crud/CacheOperations";
import { grayThemeColor } from "../../library/constants";
import { isEmpty } from "@aws-amplify/core";

const Bio = ({ username }) => {
  const [bio, setBio] = useState("");
  const [bioEmpty, setBioEmpty] = useState(false);

  async function getUserBio() {
    const bio = await getBio(username);
    if (bio === "") {
      setBioEmpty(true);
      setBio("Bio is empty");
    } else {
      setBioEmpty(false);
      setBio(bio);
    }
  }

  useEffect(() => {
    getUserBio();
  });

  const styles = StyleSheet.create({
    container: {
      marginTop: 5,
      minWidth: "80%",
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 0.5,
      minHeight: "auto",
      borderRadius: 10,
      flexDirection: "column",
    },
    bio: {
      paddingTop: 5,
      minHeight: 50,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: 15,
      color: bioEmpty ? grayThemeColor : "black",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  );
};

export default Bio;
