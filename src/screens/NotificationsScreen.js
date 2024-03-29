import { Text, View, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import Header from "../components/Header/Header";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getNotifications, deleteNotification, deleteAllNotifications } from "../crud/NotificationOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import NotificationMini from "../components/Notification/NotificationMini";
import DefaultTheme from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

Storage.configure();

export function NotificationsScreen({ showNotifications, setShowNotifications }) {
  const nav = useNavigation();
  const currUser = getCurrentUser();
  const [notifications, setNotifications] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  async function notificationList() {
    const username = await getCurrentUser();
    const Notifications = await getNotifications(username);
    if (!Notifications || !Array.isArray(Notifications)) return;
    setNotifications(Notifications);
    if (Notifications.length === 0) setIsEmpty(true);
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
      testID="Notification"
    />
  ));

  return (
    <>
      <Modal visible={showNotifications} animationType="fade" transparent={true} onRequestClose={() => setShowNotifications(false)}>
        <View style={{ backgroundColor: "white", height: "100%" }} testID="Notifications_Screen">
          <View style={{ alignItems: "center", paddingBottom: 20 }}>
            <Header title={"Notifications"} style={{ backgroundColor: "white" }} />
            <Pressable onPressOut={() => setShowNotifications(false)} style={styles.backArrow} testID="Notifications_Back_Arrow">
              <AntDesign name="arrowleft" size={40} style={styles.backArrow} />
            </Pressable>
            {isEmpty && (
              <View>
                <Text style={styles.defaultText}>Looks like there are no new notifications!</Text>
              </View>
            )}
            {!isEmpty && <CustomButton buttonType={"default"} text={"Delete All"} onClick={() => deleteAllButton(currUser)} testID="Notifications_Delete_All"></CustomButton>}
          </View>
          <View>
            <ScrollView contentContainerStyle={styles.scroll}>{listNotifications}</ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 50,
  },
  button: {
    width: 100,
    margin: 10,
  },
  defaultText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 30,
  },
  backArrow: {
    width: 80,
    height: 40,
    backgroundColor: "white",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
});
