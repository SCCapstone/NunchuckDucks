import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "./src/screens/SettingsScreen.js";
import { ExploreScreen } from "./src/screens/ExploreScreen.js";
import { MutualScreen } from "./src/screens/MutualScreen.js";
import { CreatePost } from "./src/screens/CreatePost.js";
import { CalendarScreen } from "./src/screens/CalendarScreen.js";
import { GoalsScreen } from "./src/screens/GoalsScreen.js";
import { ProfileScreen } from "./src/screens/ProfileScreen.js";
import { FollowerScreen } from "./src/screens/FollowerScreen.js";
import { CreateGoalScreen } from "./src/screens/CreateGoalScreen.js";
import Navbar from "./src/components/Navbar";
import { Amplify } from "@aws-amplify/core";
import awsmobile from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure({
  ...awsmobile,
  Analytics: {
    disabled: true,
  },
});
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
        <Stack.Screen
          name="Followers"
          component={FollowerScreen}
          initialParams={{ isFollowerPage: false }}
        />
        <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
};

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default withAuthenticator(app, { signUpConfig });
