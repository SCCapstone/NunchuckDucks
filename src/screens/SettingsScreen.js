import { View, Text, StyleSheet, Switch } from "react-native";
import Header from "../components/Header/Header";
import { setPrivate, setPublic, isUserPrivate, togglePrivacy } from "../crud/UserOperations";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

export function SettingsScreen({navigation}) {

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
    <View
      style={style.container}
    >
      <Header title={"Settings"} />

      <Text style={style.text}>
        Toggle privacy
      </Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={style.switch}
      />
    </View>
  );
}

const style = StyleSheet.create({
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
})
