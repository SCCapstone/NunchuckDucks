import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from "react-native";

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    overflow: "scroll",
    flexDirection: "row",
    height: "10%",
    maxHeight: "10%",
    /*justifyContent: "center",*/
  },
  nav: { alignItems: "center" },
  navbarElement: {
    width: 120,
    height: 30,
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
  bold: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
export function Navbar() {
  const navigation = useNavigation();
  const [clickedElement, setClickedElement] = useState("Mutuals");

  return (
    <ScrollView
      style={styles.navbar} /*style is for the "view" parent component */
      contentContainerStyle={
        styles.nav
      } /*this one is for the actual scrollable view child */
      horizontal={true}
      bounces={false}
    >
      <Text
        title="Settings"
        onPress={() => {
          navigation.navigate("Settings");
          setClickedElement("Settings");
        }}
        style={[
          clickedElement == "Settings" ? styles.bold : {},
          styles.navbarElement,
        ]}
      >
        Settings
      </Text>
      <Text
        title="Explore"
        onPress={() => {
          navigation.navigate("Explore");
          setClickedElement("Explore");
        }}
        style={[
          clickedElement == "Explore" ? styles.bold : {},
          styles.navbarElement,
        ]}
      >
        Explore
      </Text>
      <Text
        title="Mutuals"
        onPress={() => {
          navigation.navigate("Mutuals");
          setClickedElement("Mutuals");
        }}
        style={[
          clickedElement == "Mutuals" ? styles.bold : {},
          styles.navbarElement,
        ]}
      >
        Mutuals
      </Text>
      <Text
        onPress={() => {
          navigation.navigate("Profile");
          setClickedElement("Profile");
        }}
        style={[
          clickedElement == "Profile" ? styles.bold : {},
          styles.navbarElement,
        ]}
      >
        Profile
      </Text>
      <Text
        onPress={() => {
          navigation.navigate("Calendar");
          setClickedElement("Calendar");
        }}
        style={[
          clickedElement == "Calendar" ? styles.bold : {},
          styles.navbarElement,
        ]}
      >
        Calendar
      </Text>
      <Text
        onPress={() => {
          navigation.navigate("Goals");
          setClickedElement("Goals");
        }}
        style={[
          clickedElement == "Goals" ? styles.bold : {},
          styles.navbarElement,
        ]}
      >
        Goals
      </Text>
    </ScrollView>
  );
}
