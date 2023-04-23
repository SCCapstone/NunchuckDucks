import { Text, Image, TouchableOpacity, View, Pressable, ImageBackground, ImageBackgroundComponent } from "react-native";
import { Auth, Amplify, DataStore } from "aws-amplify";
import { deleteAllCache } from "../../crud/CacheOperations";
import FastImage from "react-native-fast-image";
import { useState } from "react";

const SignOutButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const signOut = async () => {
    let subsCleared = false;
    while (!subsCleared) {
      subsCleared = await clearSubs();
    }

    try {
      await DataStore.stop();
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  async function signOutOps() {
    if (isClicked) return;
    setIsClicked(true);
    await deleteAllCache();
    await FastImage.clearDiskCache();
    await FastImage.clearMemoryCache();
    signOut();
  }

  const clearSubs = async () => {
    try {
      await DataStore.clear();
      return true;
    } catch (error) {
      console.log("Failed to clear subscriptions");
      return false;
    }
  };

  return (
    <Pressable
      style={{
        backgroundColor: "#2e8cff",
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
      }}
      onPress={() => {
        signOutOps();
      }}
    >
      <Text
        style={{
          //fontWeight: "bold",
          textAlign: "center",
          //fontSize: 18,
          color: "white",
        }}
      >
        Sign Out
      </Text>
    </Pressable>
  );
};

export default SignOutButton;
