import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Header from "../components/Header/Header";
import { BackButton } from "../components/BackButton";
import { getPostsThatShouldBeCached, getAllCachedFiles, deleteCachedFile, getCachedCurrUser } from "../crud/CacheOperations";

import { setPrivate, setPublic, isUserPrivate, togglePrivacy } from "../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

export function SettingsScreen({ navigation }) {
  async function deleteOldCache() {
    let postNames = await getPostsThatShouldBeCached();
    if (postNames === null) {
      console.log("No posts in cache, so there is no need to delete old cache");
    }
    // iterate through all files in cache and delete the pngs that are no longer in the post list
    let filesInCache = await getAllCachedFiles();
    for (let i = 0; i < filesInCache.length; i++) {
      let curr = filesInCache[i];
      if (curr.substring(curr.length - 3) === "png" && postNames.indexOf(curr) === -1) {
        await deleteCachedFile(curr);
        console.log("Deleted file", curr);
      } else if (!isNaN(curr.substring(curr.length - 1)) && postNames.indexOf(curr) === -1) {
        // this is for the old posts that don't have "png" at the end; they with in a number
        await deleteCachedFile(curr);
        console.log("Deleted file", curr);
      }
    }
  }

  const styles = StyleSheet.create({
    deleteCacheButton: {
      height: 40,
      backgroundColor: "#2E8CFF",
      color: "#GG1342",
      width: 150,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      display: "flex",
    },
    text: {
      top: 33,
      left: 20,
    },
    switch: {
      right: 175
    },
  });


  const [username, setUsername] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [userPrivacy, setUserPrivacy] = useState(null);
  const nav = useNavigation();

  const toggleSwitch = () => {
    if (userPrivacy === true) {
      togglePrivacy(username, false);
      setIsEnabled(previousState => false);
      setUserPrivacy(false);
    }
    else {
      togglePrivacy(username, true);
      setIsEnabled(previousState => true);
      setUserPrivacy(true);
    }
  }

  useEffect(() => {
    getUser();
    getPrivacy();
    if (userPrivacy === true) {
      setIsEnabled(true);
    }
    else {
      setIsEnabled(false);
    }
  },[nav]);

  async function getUser() {
    const Username = await getCurrentAuthenticatedUser();
    setUsername(Username);
  }

  async function getPrivacy() {
    const Privacy = await isUserPrivate(username);
    setUserPrivacy(Privacy);
    console.log("got");
  }

  return (
    <View style={styles.container}>
      <Header title={"Settings"} />
      <TouchableOpacity style={styles.deleteCacheButton} onPress={(event) => deleteOldCache()}>
        <Text style={{ color: "#FFFFFF" }}>Delete old cache</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Toggle privacy
      </Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
    </View>
  );
}
