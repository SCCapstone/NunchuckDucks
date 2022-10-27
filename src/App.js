import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "./screens/SettingsScreen.js";
import { ExploreScreen } from "./screens/ExploreScreen.js";
import { MutualScreen } from "./screens/MutualScreen.js";
import { CreatePost } from "./screens/CreatePost.js";
import { CalendarScreen } from "./screens/CalendarScreen.js";
import { GoalsScreen } from "./screens/GoalsScreen.js";
import { ProfileScreen } from "./screens/ProfileScreen.js";
import { Navbar } from "./components/Navbar.js";
import { LoginScreen } from "./screens/LoginScreen.js";
import { CreateAccountScreen } from "./screens/CreateAccountScreen.js";
import { useState } from "react";
import { Text } from "react-native";
//import Amplify from "@aws-amplify/core";
//import awsmobile from "./aws-exports";
//Amplify.configure(awsmobile);
const Stack = createNativeStackNavigator();

import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

export default function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {userAuthenticated ? (
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
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        </Stack.Navigator>
      )}
      {userAuthenticated ? <Navbar /> : <Text></Text>}
    </NavigationContainer>
  );
}
