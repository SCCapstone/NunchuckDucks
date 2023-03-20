import { DataStore } from "aws-amplify";
import { Notification } from "../models";
import { getUserId } from "./UserOperations";

export async function createNotification(username, date, content) {
    try {
        const userId = await getUserId(username);

        const notification = new Notification({
            username: username, 
            date: date,
            content: content,
            userID: userId,
        })
        await DataStore.save(notification);
        console.log(`Notification ${notification.id} saved successfully`);
    }catch(error) {
        console.error("Error saving goal", error);
    }
}

/**
 * Return a list of all notifications for a user based on username
 * 
 * @param {String} username 
 * @returns notifications
 */
export async function getNotifications(username) {
    try {
        const userId = await getUserId(username);
        console.log("username: ", username);
        console.log("User ID: ", userId);
        const notifications = await DataStore.query(Notification, (n) => n.userID.eq(userId));
        console.log("Notifications: ", notifications);

        console.log(`Successfully retrieved notifications for ${username}`);
        return notifications;
    }catch(error) {
        console.error("Error retrieving notification list", error);
    }
}

export async function deleteNotification(notificationId) {
    try {
        const notiToDelete = await DataStore.query(Notification, notificationId);
        await DataStore.delete(notiToDelete);
        console.log(`Successfully deleted notification ${notiToDelete.id}`);
    }catch(error) {
        console.error("Error deleting notification ", error);
    }
}