import React from "react";
import { View, TextInput, Button } from "react-native";
import { API, graphqlOperation, Auth, DataStore } from "aws-amplify";
import { Notifications } from "expo";
import * as mutations from "../graphql/mutations.js";
import * as queries from "../graphql/queries.js";
import * as Permissions from "expo-permissions";
import { useState, useEffect } from "react";
import { User } from "../models";

export function NotificationsScreen() {
  useEffect(() => {
    componentDidMount();
  })

  const [Message, setMessage] = useState("");
  const [Profile, setProfile] = useState({})
  const [currUser, setCurrUser] = useState({})

  async function componentDidMount() {
    const user = await Auth.currentSession()
      .then(data => {
        this.setCurrUser(data.idToken.payload.sub);
        return data.idToken.payload.sub;
      })
      .catch(err => console.log(err));
    const profile = await getUserProfile(currUser);
    console.log("Profile: " + profile);
    // There is no expoToken available yet, so we will request that and save it into the profile
    if (profile.expoToken === null) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        alert("No notification permissions!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      // Only update the profile with the expoToken if it not exists yet
      if (token !== "") {
        const inputParams = {
          id: currUser,
          expoToken: token
        };
        console.log("These are the input params: " + inputParams);
        await API.graphql(
          graphqlOperation(mutations.updateUser, { input: inputParams })
        )
          .then(result => {
            console.log(result);
          })
          .catch(err => console.log(err));
      }
    }
  }
  async function getUserProfile(sub) {
    // const result = await API.graphql(
    //   graphqlOperation(queries.getUser, { id: sub })
    // )
    const result = await DataStore.query(User,sub)
      // .then(result => {
      //   this.setProfile(result.data.getCurrUser);
      //   return result.data.getCurrUser;
      // })
      .catch(err => console.log(err));
    return result;
  }

  async function handleSubmit() {

    const inputParams = {
      message: Message,
      token: Profile.expoToken,
      name: Profile.name,
      email: Profile.email,
      id: currUser
    };
    console.log("This is the input params message: " + inputParams.message);
    // console.log("Profole Expo Token: " + inputParams.Profile.expoToken);
    // console.log("Name: " + inputParams.Profile.name);
    // console.log("Email: " + inputParams.Profile.email);
    // console.log("Id: " + inputParams.id);
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