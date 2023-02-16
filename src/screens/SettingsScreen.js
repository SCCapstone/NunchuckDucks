import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/Header/Header";
import { BackButton } from "../components/BackButton";
import { getPostsThatShouldBeCached, getAllCachedFiles, deleteCachedFile } from "../crud/CacheOperations";

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
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteCacheButton} onPress={(event) => deleteOldCache()}></TouchableOpacity>
      <Header title={"Settings"} />

      <Text>Toggle private account eventually goes here</Text>
    </View>
  );
}
