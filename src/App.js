<<<<<<< HEAD
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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DataStore } from "@aws-amplify/datastore";
import { SettingsScreen } from "./SettingsScreen.js";
import { ExploreScreen } from "./ExploreScreen.js";
import { MutualScreen } from "./MutualScreen.js";
import { CreatePost } from "./CreatePost.js";
import { CalendarScreen } from "./CalendarScreen.js";
import { GoalsScreen } from "./GoalsScreen.js";
import { ProfileScreen } from "./ProfileScreen.js";
import { Navbar } from "./Navbar.js";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Mutuals"
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Mutuals" component={MutualScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
      </Stack.Navigator>
      {<Navbar />}
    </NavigationContainer>
=======
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Changes!</Text>
      <StatusBar style="auto" />
    </View>
>>>>>>> 61afbbdb71a1255b4f5c995a38c728d6457a046d
  );
}

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
  placeholder: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  scrollplaceholder: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "white",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submit: {
    height: 40,
  },
  post: {
    height: 500,
    width: "100%",
    borderWidth: 2,
    marginBottom: 20,
=======
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
>>>>>>> 61afbbdb71a1255b4f5c995a38c728d6457a046d
  },
});

/*function Post() {
  return (
    <View style={styles.post}>
      <View
        style={{
          height: "10%",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        flexDirection="row"
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={require("./pictures/weeknd.jpeg")}
        />
        <Text>Header yayyy</Text>
      </View>
      <Image
        style={{ height: "80%", width: "100%" }}
        source={require("./pictures/weeknd.jpeg")}
      />
      <View style={{ height: "10%", width: "100%", justifyContent: "center" }}>
        <Text>Footer yayyy</Text>
      </View>
    </View>
  );
}*/
