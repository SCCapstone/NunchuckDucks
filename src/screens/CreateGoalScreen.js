import { Text, View, StyleSheet } from "react-native";
import { grayThemeColor } from "../library/constants";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";

export function CreateGoalScreen({}) {
    

    return (
        <View>
            
        </View>
    );
}

const styles = StyleSheet.create({

});

const sampleGoalsList = [
    {
        goalType: "cardio",
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

const CreateGoalHeader = () => {
    <View>
        <BackButton />
    </View>
}