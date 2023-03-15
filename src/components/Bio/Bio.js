import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getBio } from "../../crud/UserOperations";
import { getCurrentUser } from "../../crud/CacheOperations";

const Bio = () => {
  const [bio, setBio] = useState("");

  async function getUserBio() {
    let username = await getCurrentUser();
    const bio = await getBio(username);
    setBio(bio);
  }

  useEffect(() => {
    getUserBio();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 310,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    minHeight: "auto",
    borderRadius: 10,
    flexDirection: "column",
  },
  bio: {
    paddingTop: 5,
    paddingBottom: 50,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
  },
});

export default Bio;
