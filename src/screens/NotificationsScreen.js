// import React from "react";
// import { View, TextInput, Button } from "react-native";
// import { API, graphqlOperation, Auth, DataStore, } from "aws-amplify";
// import { Notifications } from "expo";
// import * as mutations from "../graphql/mutations.js";
// import * as queries from "../graphql/queries.js";
// import * as Permissions from "expo-permissions";
// import { useState, useEffect } from "react";
// import { User } from "../models";
// import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser.js";
// import { getUserId } from "../crud/UserOperations.js";

// export function NotificationsScreen() {
//   useEffect(() => {
//     componentDidMount();
//   })

//   const [Message, setMessage] = useState("");
//   const [Profile, setProfile] = useState({});
//   const [currUser, setCurrUser] = useState({});
//   const [id, setId] = useState("");

//   async function componentDidMount() {
//     const user = await getCurrentAuthenticatedUser();
//     setCurrUser(user);
//     console.log("User: " + currUser);
//     const ID = getUserId(currUser);
//     setId(ID);
//     console.log("id: " + id);
//     // There is no expoToken available yet, so we will request that and save it into the profile
//     // if (getUserId(currUser).expoToken === null) {
//     //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     //   if (status !== "granted") {
//     //     alert("No notification permissions!");
//     //     return;
//     //   }
//     //   let token = await Notifications.getExpoPushTokenAsync();
//     //   // Only update the profile with the expoToken if it not exists yet
//     //   if (token !== "") {
//     //     const inputParams = {
//     //       id: currUser,
//     //       expoToken: token
//     //     };
//     //     console.log("These are the input params: " + inputParams);
//     //     await API.graphql(
//     //       graphqlOperation(mutations.updateUser, { input: inputParams })
//     //     )
//     //       .then(result => {
//     //         console.log(result);
//     //       })
//     //       .catch(err => console.log(err));
//     //   }
//     // }
//   }
//   async function getUserProfile(sub) {
//     const result = await API.graphql(
//       graphqlOperation(queries.getUser, { id: sub })
//     ).catch(err => console.log(err));
//     return result;
//   }

//   async function handleSubmit() {
//     const inputParams = {
//       message: Message,
//       //token: getUserId(currUser).expoToken,
//       name: currUser,
//       id: id,
//     };
//     console.log("This is the input params message: " + inputParams.message);
//     //console.log("Profole Expo Token: " + inputParams.Profile.expoToken);
//     console.log("Name: " + inputParams.name);
//     // console.log("Email: " + inputParams.Profile.email);
//     console.log("Id: " + inputParams.id);
//     await API.graphql(
//       graphqlOperation(mutations.pinpoint, { input: inputParams })
//     )
//       .then(result => {
//         console.log(result);
//         console.log("success");
//         this.setState({ message: "" });
//       })
//       .catch(err => console.log(err));
//       //console.log("Success");
//   }

//   return (
//     <View style={{ marginTop: 80, marginLeft: 10, marginRight: 10 }}>
//         <TextInput
//           placeholder="Your push message"
//           value={Message}
//           onChangeText={input => setMessage(input)}
//           style={{
//             paddingLeft: 5,
//             height: 40,
//             fontSize: 16,
//             marginBottom: 6,
//             marginTop: 2
//           }}
//         ></TextInput>
//         <Button title="Submit" onPress={handleSubmit} />
//       </View>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function NotificationsScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}