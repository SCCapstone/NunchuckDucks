import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "./src/screens/SettingsScreen.js";
import { ExploreScreen } from "./src/screens/ExploreScreen.js";
import { MutualScreen } from "./src/screens/MutualScreen.js";
import { CreatePost } from "./src/screens/CreatePost.js";
import { CalendarScreen } from "./src/screens/CalendarScreen.js";
import { GoalsScreen } from "./src/screens/GoalsScreen.js";
import { ProfileScreen } from "./src/screens/ProfileScreen.js";
import Navbar from "./src/components/Navbar";
import { Amplify } from "@aws-amplify/core";
import awsmobile from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure(awsmobile);
const Stack = createNativeStackNavigator();

const app = () => {
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
      <Navbar />
    </NavigationContainer>
  );
};

export default withAuthenticator(app, true);
