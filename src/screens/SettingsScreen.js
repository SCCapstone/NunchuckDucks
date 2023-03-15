import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Header from "../components/Header/Header";
import { getPostsThatShouldBeCached, getAllCachedFiles, deleteCachedFile } from "../crud/CacheOperations";
import { isUserPrivate, togglePrivacy } from "../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

export function SettingsScreen({ navigation }) {
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
      right: 175,
    },
  });

  const [username, setUsername] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [userPrivacy, setUserPrivacy] = useState(null);
  const nav = useNavigation();
  const toggleSwitch = () => {
    if (userPrivacy === true) {
      togglePrivacy(username, false);
      setIsEnabled((previousState) => false);
      setUserPrivacy(false);
    } else {
      togglePrivacy(username, true);
      setIsEnabled((previousState) => true);
      setUserPrivacy(true);
    }
  };

  useEffect(() => {
    getUser();
    getPrivacy();
    if (userPrivacy === true) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [nav]);

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

      <TouchableOpacity style={styles.deleteCacheButton} onPress={(event) => ""}>
        <Text style={{ color: "#FFFFFF" }}>Delete old cache</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Toggle privacy</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
    </View>
  );
}
