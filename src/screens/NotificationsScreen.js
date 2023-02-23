import React from "react";
import { View, TextInput, Button } from "react-native";
import { API, graphqlOperation, Auth, DataStore, } from "aws-amplify";
import { Notifications } from "expo";
import * as mutations from "../graphql/mutations.js";
import * as queries from "../graphql/queries.js";
import * as Permissions from "expo-permissions";
import { useState, useEffect } from "react";
import { User } from "../models";
import { getCurrentAuthenticatedUser } from "../library/GetAuthenticatedUser.js";
import { getUserId } from "../crud/UserOperations.js";

export function NotificationsScreen() {
  useEffect(() => {
    componentDidMount();
  })

  const [Message, setMessage] = useState("");
  const [Profile, setProfile] = useState({});
  const [currUser, setCurrUser] = useState({});
  const [id, setId] = useState("");

  async function componentDidMount() {
    const user = await getCurrentAuthenticatedUser();
    setCurrUser(user);
    console.log("User: " + currUser);
    const ID = getUserId(currUser);
    setId(ID);
    console.log("id: " + id);
    // There is no expoToken available yet, so we will request that and save it into the profile
    // if (getUserId(currUser).expoToken === null) {
    //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //   if (status !== "granted") {
    //     alert("No notification permissions!");
    //     return;
    //   }
    //   let token = await Notifications.getExpoPushTokenAsync();
    //   // Only update the profile with the expoToken if it not exists yet
    //   if (token !== "") {
    //     const inputParams = {
    //       id: currUser,
    //       expoToken: token
    //     };
    //     console.log("These are the input params: " + inputParams);
    //     await API.graphql(
    //       graphqlOperation(mutations.updateUser, { input: inputParams })
    //     )
    //       .then(result => {
    //         console.log(result);
    //       })
    //       .catch(err => console.log(err));
    //   }
    // }
  }
  async function getUserProfile(sub) {
    const result = await API.graphql(
      graphqlOperation(queries.getUser, { id: sub })
    ).catch(err => console.log(err));
    return result;
  }

  async function handleSubmit() {
    const inputParams = {
      message: Message,
      //token: getUserId(currUser).expoToken,
      name: currUser,
      id: id,
    };
    console.log("This is the input params message: " + inputParams.message);
    //console.log("Profole Expo Token: " + inputParams.Profile.expoToken);
    console.log("Name: " + inputParams.name);
    // console.log("Email: " + inputParams.Profile.email);
    console.log("Id: " + inputParams.id);
    await API.graphql(
      graphqlOperation(mutations.pinpoint, { input: inputParams })
    )
      .then(result => {
        console.log(result);
        console.log("success");
        this.setState({ message: "" });
      })
      .catch(err => console.log(err));
      //console.log("Success");
  }

  return (
    <View style={{ marginTop: 80, marginLeft: 10, marginRight: 10 }}>
        <TextInput
          placeholder="Your push message"
          value={Message}
          onChangeText={input => setMessage(input)}
          style={{
            paddingLeft: 5,
            height: 40,
            fontSize: 16,
            marginBottom: 6,
            marginTop: 2
          }}
        ></TextInput>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
  );
}