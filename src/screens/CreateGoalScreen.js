import { View, StyleSheet, TextInput } from "react-native";
import Header from "../components/Header";
import React from 'react';
import CustomButton from "../components/CustomButton";
import Storage from "@aws-amplify/storage";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { createGoal } from "../crud/GoalOperations";

export function CreateGoalScreen() {
    const [text, onChangeText] = React.useState(null);
    const navigation = useNavigation();

    Storage.configure();
    async function saveGoal() {
        const { attributes } = await Auth.currentAuthenticatedUser();
        let username = attributes.preferred_username;
        var date = getDate();
        let userId = "some_userid123";
        createGoal(username, date, text, userId);
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
                <View style={styles.miniContainer}>
                <CustomButton 
                    text="Create Goal"
                    style={styles.button}
                    onClick={saveGoal}
                />
                </View>
            </View>
        </View>
    );
}

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = String(today.getFullYear());

    var date = yyyy + "-" + mm  + "-" + dd;
    return date;
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
        margin: 10,
    },
    miniContainer: {
        alignItems: "center",
    },
});