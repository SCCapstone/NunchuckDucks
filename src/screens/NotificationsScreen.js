import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
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
import {
  getNotifications,
  deleteNotification,
  getNotificationCount,
  deleteAllNotifications
} from "../crud/NotificationOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import NotificationMini from "../components/Notification/NotificationMini";
import DefaultTheme from "@react-navigation/native";

Storage.configure();

export function NotificationsScreen() {
  const nav = useNavigation();
  const currUser = getCurrentUser();
  const [notifications, setNotifications] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(true);

  async function notificationList() {
    const username = await getCurrentUser();
    const Notifications = await getNotifications(username);
    if (!Notifications || !Array.isArray(Notifications)) return;
    setNotifications(Notifications);
  }

  async function deleteAllButton(username) {
      await deleteAllNotifications(username);
      setForceRefresh(!forceRefresh);
  }

  useEffect(() => {
    console.log("refreshing notifications screen");
    notificationList();
    const focusHandler = nav.addListener("focus", () => {
      setForceRefresh(!forceRefresh);
    });
  }, [forceRefresh, nav]);

  const listNotifications = notifications.map((notification) => (
    <NotificationMini
      key={notification.id}
      content={notification.content}
      onDeleteHandler={async () => {
        let notificationId = notification.id;
        console.log(notificationId);
        await deleteNotification(notificationId);
        // setForceRefresh(!forceRefresh); temporarily removed for now, since we're hiding the notifications
        // This speeds up the UI immensely, since we don't have to wait on this query
        // to rerender every time a deletion happens
      }}
      username={notification.interactingUserUsername}
    />
  ));

  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%"}}>
        <View style={{alignItems: "center"}}>
          <Header
            title={"Notifications"}
            style={{ backgroundColor: "white" }}
          />
          <CustomButton buttonType={"default"} text={"Delete All"} onClick={() => deleteAllButton(currUser)}></CustomButton>
        </View>
        <View>
          <ScrollView contentContainerStyle={styles.scroll}>
            {listNotifications}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  scroll: {
    alignItems: "center",
    display: "flex",
    backgroundColor: DefaultTheme,
    paddingBottom: 50
  },
  button: {
    width: 100,
    margin: 10,
  },
});

