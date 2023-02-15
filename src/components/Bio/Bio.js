import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
import { getBio } from "../../crud/UserOperations";

const Bio = () => {
    const [bio, setBio] = useState("");

    async function getUserBio() {
        let username = await getCurrentAuthenticatedUser();
        const bio = await getBio(username);
        setBio(bio);
    }

    useEffect(() => {
        getUserBio();
    });

    return (
        <View style={styles.container}>
            <Text style={styles.bio}>{bio}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 310,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: .5,
        minHeight: "auto",
        borderRadius: 10,
        flexDirection: "column",
    },
    bio: {
        paddingTop: 5,
        paddingBottom: 50,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 15
    }
});

export default Bio;