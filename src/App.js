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
import Amplify from "@aws-amplify/core";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);
const Stack = createNativeStackNavigator();

/**
 * the main function of the app
 * contains Stack.Screens and Navbar compoonent which are navigable by seperate NavigationContainers
 * @returns entire view of the app
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          //
          headerShown: false, // view navigator default header is not shown on app
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
  );
}
