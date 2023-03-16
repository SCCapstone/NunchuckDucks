import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SettingsScreen } from "./src/screens/SettingsScreen.js";
import { ExploreScreen } from "./src/screens/ExploreScreen.js";
import { MutualScreen } from "./src/screens/MutualScreen.js";
import { CreatePost } from "./src/screens/CreatePost.js";
import { CalendarScreen } from "./src/screens/CalendarScreen.js";
import { GoalsScreen } from "./src/screens/GoalsScreen.js";
import { ProfileScreen } from "./src/screens/ProfileScreen.js";
import { FollowerScreen } from "./src/screens/FollowerScreen.js";
import { CreateGoalScreen } from "./src/screens/CreateGoalScreen.js";
import { NotificationsScreen } from "./src/screens/NotificationsScreen.js";
import Navbar from "./src/components/Navbar";
import { Amplify, API } from "@aws-amplify/core";
import awsmobile from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { StyleSheet, View, TitleText } from "react-native";
import { Storage } from "@aws-amplify/storage";
import * as clients3 from "@aws-sdk/client-s3";

Amplify.configure({
  ...awsmobile,
  Analytics: {
    disabled: true,
  },
  API: {
    endpoints: [
      {
        name: "getLastModified",
        endpoint: "https://5rr13okysb.execute-api.us-east-1.amazonaws.com",
      },
    ],
  },
  Auth: {
    identityPoolId: "us-east-1:a7036c0d-28de-48ac-9cbe-82440d6dc8c1", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "us-east-1", // REQUIRED - Amazon Cognito Region
    userPoolId: "us-east-1_5M4En6xo2", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "335mhs43pnhh4qa4bah1gfldms", //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: "nunchuckducks-picture-storage102612-dev", //REQUIRED -  Amazon S3 bucket name
      region: "us-east-1", //OPTIONAL -  Amazon service region
    },
  },
});
const Stack = createMaterialTopTabNavigator();

const app = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarScrollEnabled: true,
          lazy: true,
          tabBarLabelStyle: { width: 120, height: 30, textAlign: "center", color: "black", fontSize: 20 },
        }}
        initialRouteName="Mutuals"
        tabBarPosition="bottom"
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* <Stack.Screen name="Explore" component={ExploreScreen} /> */}
        <Stack.Screen name="Mutuals" component={MutualScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* <Stack.Screen name="CreatePost" component={CreatePost} /> */}
        {/* <Stack.Screen name="Calendar" component={CalendarScreen} /> */}
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Followers" component={FollowerScreen} initialParams={{ isFollowerPage: false }} />
        <Stack.screen name="Notifications" component={NotificationsScreen} />
        {/* <Stack.Screen name="CreateGoal" component={CreateGoalScreen} /> */}
      </Stack.Navigator>
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
