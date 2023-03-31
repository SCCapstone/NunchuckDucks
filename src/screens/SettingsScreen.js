import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Header from "../components/Header/Header";
import { isUserPrivate, togglePrivacy } from "../crud/UserOperations";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { getCurrentUser } from "../crud/CacheOperations";

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
      height: "100%",
      backgroundColor: "white",
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
    const Username = await getCurrentUser();
    setUsername(Username);
  }

  async function getPrivacy() {
    const Privacy = await isUserPrivate(username);
    setUserPrivacy(Privacy);
  }

  return (
    <View style={styles.container}>
      <Header title={"Settings"} />
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
