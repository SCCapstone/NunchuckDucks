import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

const styles = StyleSheet.create({
  /* styles tied to the scroll behavior */
  navbarView: {
    flex: 1,
    overflow: "scroll",
    flexDirection: "row",
    height: "10%",
    maxHeight: "10%",
  },
  /* styles only tied to the static "parent" view */
  navbarScrollView: { alignItems: "center" },
  /* styles for all navbar elements */
  navbarElement: {
    width: 120,
    height: 30,
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
  /* styles for the currently selected element */
  currentNavbarElement: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
const Navbar = () => {
  const navigation = useNavigation();
  const [clickedElement, setClickedElement] = useState("Mutuals");

  return (
    <ScrollView
      style={styles.navbarView}
      contentContainerStyle={styles.navbarScrollView}
      horizontal={true}
      bounces={false}
    >
      {/* <Text
        title="Settings"
        onPress={() => {
          navigation.navigate("Settings");
          setClickedElement("Settings");
        }}
        style={[
          clickedElement == "Settings" ? styles.currentNavbarElement : {},
          styles.navbarElement,
        ]}
      >
        Settings
      </Text> */}
      {/* <Text
        title="Explore"
        onPress={() => {
          navigation.navigate("Explore");
          setClickedElement("Explore");
        }}
        style={[
          clickedElement == "Explore" ? styles.currentNavbarElement : {},
          styles.navbarElement,
        ]}
      >
        Explore
      </Text> */}
      <Text
        title="Mutuals"
        onPress={() => {
          navigation.navigate("Mutuals");
          setClickedElement("Mutuals");
        }}
        style={[
          clickedElement == "Mutuals" ? styles.currentNavbarElement : {},
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
          clickedElement == "Profile" ? styles.currentNavbarElement : {},
          styles.navbarElement,
        ]}
      >
        Profile
      </Text>
      {/* <Text
        onPress={() => {
          navigation.navigate("Calendar");
          setClickedElement("Calendar");
        }}
        style={[
          clickedElement == "Calendar" ? styles.currentNavbarElement : {},
          styles.navbarElement,
        ]}
      >
        Calendar
      </Text> */}
      <Text
        onPress={() => {
          navigation.navigate("Goals");
          setClickedElement("Goals");
        }}
        style={[
          clickedElement == "Goals" ? styles.currentNavbarElement : {},
          styles.navbarElement,
        ]}
      >
        Goals
      </Text>
      <Text
        onPress={() => {
          navigation.navigate("Followers");
          setClickedElement("Followers");
        }}
        style={[
          clickedElement == "Followers" ? styles.currentNavbarElement : {},
          styles.navbarElement,
        ]}
      >
        Followers
      </Text>
    </ScrollView>
  );
};

export default Navbar;
