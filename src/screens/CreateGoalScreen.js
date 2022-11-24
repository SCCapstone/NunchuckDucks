import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { grayThemeColor } from "../library/constants";
import Header from "../components/Header";
import React from 'react';
import CustomButton from "../components/CustomButton";
import { DataStore } from "@aws-amplify/datastore";
import Storage from "@aws-amplify/storage";
import { Auth } from "aws-amplify";
import { Goal } from "../models";
import { useNavigation } from "@react-navigation/native";

export function CreateGoalScreen() {
    const [text, onChangeText] = React.useState(null);
    const [goalType, setGoalType] = React.useState(null);
    const navigation = useNavigation();

    Storage.configure();
    async function saveGoal() {
        await DataStore.start();
        try {
            const { attributes } = await Auth.currentAuthenticatedUser();
            let username = attributes.preferred_username;
            var date = getDate();
            await DataStore.save(
                new Goal({
                    username: username,
                    date: date,
                    content: text,
                    userID: "some_userid123",
                })
            );
        } catch {
            console.error("Error uploading goal");
        }
        navigation.navigate("Goals");
    }

    return (
        <View>
            <Header title={'Create Goal'} />

            <View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    placeholder={"Enter details about your goal"}
                    value={text}
                />
                <CustomButton 
                    text="Create Goal"
                    style={styles.button}
                    onClick={saveGoal}
                />
            </View>
        </View>
    );
}

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = String(today.getFullYear());
    var time = String(today.getTime());

    var name = mm + "-" + dd + "-" + yyyy + "-" + time;
    return name;
}

const styles = StyleSheet.create({
    textInput: {
        textAlign: "center",
        padding: 10,
        borderBottomColor: "black",
        borderWidth: 1,
        margin: 12,
        borderRadius: 100
    },
    button: {
        width: 100,
        margin: 10
    },
    container: {
        flexDirection: "row"
    },
    text: {
        textAlign: "center"
    }
});