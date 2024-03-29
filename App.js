import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SettingsScreen } from "./src/screens/SettingsScreen.js";
import { MutualScreen } from "./src/screens/MutualScreen.js";
import { WorkoutsScreen } from "./src/screens/WorkoutsScreen.js";
import { GoalsScreen } from "./src/screens/GoalsScreen.js";
import { ProfileScreen } from "./src/screens/ProfileScreen.js";
import { FollowerScreen } from "./src/screens/FollowerScreen.js";
import { Amplify, Hub } from "@aws-amplify/core";
import awsmobile from "./src/aws-exports";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { DataStore} from "@aws-amplify/datastore";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast.js";
import { blueThemeColor } from "./src/library/constants.js";
import { AntDesign } from "@expo/vector-icons";

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
              tabBarShowLabel: false,
              tabBarShowIcon: true,
              tabBarScrollEnabled: false,
              tabBarIconStyle: {
                width: "auto",
                height: 20,
              },
            }}
            initialRouteName="Mutuals"
            tabBarPosition="bottom"
          >
            <Stack.Screen
              name="Mutuals"
              options={{
                tabBarIcon: () => <AntDesign name="home" size={20} testID="Mutuals_Screen" accessibilityLabel="Mutuals_Screen"></AntDesign>,
              }}
            >
              {(props) => <MutualScreen {...props} refresh={refresh} setRefresh={setRefresh} />}
            </Stack.Screen>
            <Stack.Screen
              name="Workouts"
              component={WorkoutsScreen}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/icons/tab-bar/tabWorkoutThick.png")}
                    style={styles.tabIcon}
                    testID="Workout_Screen"
                    accessibilityLabel="Workout_Screen"
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Goals"
              component={GoalsScreen}
              initialParams={{ isCompletedPage: false }}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/icons/tab-bar/tabGoalThick.png")}
                    style={styles.tabIcon}
                    testID="Goals_Screen"
                    accessibilityLabel="Goals_Screen"
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Followers"
              component={FollowerScreen}
              initialParams={{ isFollowerPage: false }}
              options={{
                tabBarIcon: () => <AntDesign name={"team"} size={20} testID="Followers_Screen" accessibilityLabel="Followers_Screen"></AntDesign>,
              }}
            />
            <Stack.Screen
              name="Profile"
              options={{
                tabBarIcon: () => (
                  <AntDesign name={"user"} size={20} testID="Profile_Screen" accessibilityLabel="Profile_Screen"></AntDesign>
                ),
              }}
            >
              {(props) => <ProfileScreen {...props} refresh={refresh} setRefresh={setRefresh} />}
            </Stack.Screen>
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: () => <Image source={require("./assets/icons/tab-bar/tabSettingsThick.png")} style={styles.tabIcon} 
                testID="Settings_Screen" accessibilityLabel="Settings_Screen"/>,
              }}
            />
            {}
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Image style={{ width: 300 }} source={require("./assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")} />
          <ActivityIndicator style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} size="large" color="#2E8CFF" />
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

const styles = StyleSheet.create({
  tabIcon: {
    width: 20,
    height: 20,
  },
});

export default withAuthenticator(app, { signUpConfig, theme: customTheme });
