import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header/Header";
import CustomButton from "../components/CustomButton";
import { DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Notification } from "../models";
import { Auth } from "aws-amplify";
import React from "react";
import { refresh } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { getDate } from "../library/getDate";
import { getNotifications, deleteNotification, createNotification } from "../crud/NotificationOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import NotificationMini from "../components/Notification/Notification";

Storage.configure();

export function NotificationsScreen() {
    const nav = useNavigation();
    const [notifications, setNotifications] = useState([]);
    const [forceRefresh, setForceRefresh] = useState(true);
    
    async function notificationList() {
        const username = await getCurrentUser();
        const Notifications = await getNotifications(username);
        console.log("Notifications, ", notifications);
        setNotifications(Notifications);
    }
    
    async function saveNotification() {
        const username = await getCurrentUser();
        var date = getDate();
        createNotification(username, date, "This is a noti");
        setForceRefresh(!forceRefresh);
    }

    useEffect(() => {
        console.log("refreshing notifications screen");
        notificationList();
        const focusHandler = nav.addListener("focus", () => {setForceRefresh(!forceRefresh)})
    },[forceRefresh, nav]);

    const listNotifications = notifications.map((notification) => (
        <NotificationMini
            content = {notification.content}
            onDeleteHandler = {async() => {
                let notificationId = notification.id;
                await deleteNotification(notificationId);
                setForceRefresh(!forceRefresh);
            }}
        />
    ));

    return (
        <><View>
            <Header title={"Notifications"} />
            <View style={styles.container}>
                <CustomButton
                    text="Test Create Notification"
                    onClick={saveNotification}
                    style={styles.button} />
            </View>
        </View>
        <ScrollView
            contentContainerStyle={styles.scroll}
        >
            {listNotifications}
        </ScrollView></>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    scroll: {
        alignItems: "center",
        display: "flex",
        backgroundColor: "white",
    },
    button: {
        width: 100,
        margin: 10,
    }
});