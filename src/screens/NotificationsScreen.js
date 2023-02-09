import React from "react";
import { View, TextInput, Button } from "react-native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { Notifications } from "expo";
import * as mutations from "../graphql/mutations.js";
import * as queries from "../graphql/queries.js";
import * as Permissions from "expo-permissions";
import { useState } from "react";

export function NotificationsScreen() {
  const [Message, setMessage] = useState("");
  const [Profile, setProfile] = useState({})
  const [User, setUser] = useState("")

  async function componentDidMount() {
    const user = await Auth.currentSession()
      .then(data => {
        this.setUser(data.idToken.payload.sub);
        return data.idToken.payload.sub;
      })
      .catch(err => console.log(err));
    const profile = await this.getUserProfile(user);
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
          id: user,
          expoToken: token
        };
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
    const result = await API.graphql(
      graphqlOperation(queries.getUser, { id: sub })
    )
      .then(result => {
        this.setProfile(result.data.getUser);
        return result.data.getUser;
      })
      .catch(err => console.log(err));
    return result;
  }

  async function handleSubmit() {
    const inputParams = {
      message: Message,
      token: Profile.expoToken,
      name: Profile.name,
      email: Profile.email,
      id: User
    };
    await API.graphql(
      graphqlOperation(mutations.pinpoint, { input: inputParams })
    )
      .then(result => {
        console.log(result);
        console.log("success");
        this.setState({ message: "" });
      })
      .catch(err => console.log(err));
      console.log("Success");
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