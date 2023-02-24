import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header/Header";
import ToggleSwitch from "toggle-switch-react-native";
import { toggleUserPrivacy } from "../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";
import { useEffect, useState } from "react";

export function SettingsScreen({navigation}) {

  const [username, setUsername] = useState("");
  useEffect(() => {
    getUser();
  });

  async function getUser() {
    const Username = await getCurrentAuthenticatedUser();
    console.log("Username: " + username);
    setUsername(Username);
  }

  return (
    <View
      style={style.container}
    >
      <Header title={"Settings"} />

      <ToggleSwitch 
        isOn = {true}
        onColor = "green"
        offColor = "red"
        label = "Make Account Private"
        labelStyle = {{color: "black", fontWeight: "bold"}}
        size = "medium"
        onToggle = {isOn  => toggleUserPrivacy(username)}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})
