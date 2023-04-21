import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SettingsScreen } from "./src/screens/SettingsScreen.js";
import { ExploreScreen } from "./src/screens/ExploreScreen.js";
import { MutualScreen } from "./src/screens/MutualScreen.js";
import { CreatePost } from "./src/screens/CreatePost.js";
import { CalendarScreen } from "./src/screens/CalendarScreen.js";
import { WorkoutsScreen } from "./src/screens/WorkoutsScreen.js";
import { GoalsScreen } from "./src/screens/GoalsScreen.js";
import { ProfileScreen } from "./src/screens/ProfileScreen.js";
import { FollowerScreen } from "./src/screens/FollowerScreen.js";
import { CreateGoalScreen } from "./src/screens/CreateGoalScreen.js";
import { NotificationsScreen } from "./src/screens/NotificationsScreen.js";
import Navbar from "./src/components/Navbar";
import { Amplify, API, Hub } from "@aws-amplify/core";
import awsmobile from "./src/aws-exports";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import {
  StyleSheet,
  View,
  TitleText,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Storage } from "@aws-amplify/storage";
import * as clients3 from "@aws-sdk/client-s3";
import { useState, useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast.js";
import { blueThemeColor } from "./src/library/constants.js";

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
  const [refresh, setRefresh] = useState(false);
  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    // Create listener that will stop observing the model once the sync process is done
    const removeListener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;

      // console.log("DataStore event", event, data);

      if (event === "ready") {
        setAppReady(true);
      }
    });

    // Start the DataStore, this kicks-off the sync process.
    DataStore.start();

    return () => {
      removeListener();
    };
  }, []);
  return (
    <>
      {appReady ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: true,
              tabBarScrollEnabled: true,
              tabBarLabelStyle: {
                width: 125,
                height: 30,
                textAlign: "center",
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
              },
            }}
            initialRouteName="Mutuals"
            tabBarPosition="bottom"
          >
            <Stack.Screen name="Settings" component={SettingsScreen} />
            {/* <Stack.Screen name="Explore" component={ExploreScreen} /> */}
            <Stack.Screen name="Mutuals">
              {(props) => (
                <MutualScreen
                  {...props}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => (
                <ProfileScreen
                  {...props}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              )}
            </Stack.Screen>
            {/* <Stack.Screen name="CreatePost" component={CreatePost} /> */}
            {/* <Stack.Screen name="Calendar" component={CalendarScreen} /> */}
            <Stack.Screen name="Goals" component={GoalsScreen} />
            <Stack.Screen name="Workouts" component={WorkoutsScreen} />
            <Stack.Screen
              name="Followers"
              component={FollowerScreen}
              initialParams={{ isFollowerPage: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            {/* <Stack.Screen name="CreateGoal" component={CreateGoalScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            style={{ width: 300 }}
            source={require("./assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")}
          />
          <ActivityIndicator
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
            size="large"
            color="#2E8CFF"
          />
        </View>
      )}
      <Toast />
    </>
  );
};

const signUpConfig = {
  header: "Sign Up",
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

const customTheme = {
  ...AmplifyTheme,
  sectionHeaderText: {
    //this is currently "Sign in to your acct text on Sign In pg"
    ...AmplifyTheme.sectionHeaderText,
    color: blueThemeColor,
    fontSize: 27,
    textAlign: "center",
  },
  inputLabel: {
    ...AmplifyTheme.inputLabel,
    color: blueThemeColor,
    fontWeight: "500",
    fontSize: 17,
  },
  input: {
    ...AmplifyTheme.input,
    borderColor: blueThemeColor,
    borderRadius: 20,
    borderWidth: 2,
    color: "#808080", //text color of user input
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: blueThemeColor,
    borderRadius: 18,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: blueThemeColor,
    borderRadius: 18,
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
    color: "#fff",
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: blueThemeColor,
    fontSize: 15,
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    fontSize: 15,
    color: blueThemeColor,
    alignItems: "baseline",
    textAlign: "center",
  },
  signedOutMessage: {
    //this is the bottom text
    ...AmplifyTheme.signedOutMessage,
    color: blueThemeColor,
    fontSize: 16,
  },
};

export default withAuthenticator(app, { signUpConfig, theme: customTheme });
