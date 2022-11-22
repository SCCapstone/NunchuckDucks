import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { grayThemeColor } from "../library/constants";
import Header from "../components/Header";
import React from 'react';
import CustomButton from "../components/CustomButton";

export function CreateGoalScreen() {
    const [text, onChangeText] = React.useState(null);
    const [goalType, setGoalType] = React.useState(null);

    return (
        <View>
            <Header title={'Create Goal'} />

            <View>
                <View style={{flexDirection: "row"}}>
                    <CustomButton 
                        text="Cardio"
                        style={{width: 100, margin: 10}}
                    />
                    <CustomButton 
                        text="Weight Lifting"
                        style={{width: 100, margin: 10}}
                    />
                    <CustomButton
                        text="Weight"
                        style={{width: 100, margin: 10}}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder={"Enter details about your goal"}
                    value={text}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        textAlign: "center",
        padding: 10,
        borderBottomColor: "black",
        borderWidth: 1,
        margin: 12,
        borderRadius: 100
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        width: '90%',
        paddingHorizontal: 10,
        zIndex: 1,
      },
      buttonText: {
        flex: 1,
        textAlign: 'center',
      },
      dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 50,
      },
});

const sampleGoalsList = [
    {
        goalType: "Cardio",
        goalDescription: "Run a 5 minute mile",
    },
    {
        goalType: "Weight Lifting",
        goalDescription: "225lb bench press PR",
    },
    {
        goalType: "Weight",
        goalDescription: "Weigh 185lbs by end of year",
    },
    {
        goalType: "Weight Lifting",
        goalDescription: "405lb squat PR",
    },
];

const goalTypes = [
    {
        value: "Cardio"
    },
    {
        value: "Weight Lifting"
    },
    {
        value: "Weight"
    },
]