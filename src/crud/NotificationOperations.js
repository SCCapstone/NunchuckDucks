import { DataStore, SortDirection } from "aws-amplify";
import { Notification } from "../models";
import { getUserId } from "./UserOperations";

export async function createNotification(username, date, content, interactingUserUsername) {
    try {
        const userId = await getUserId(username);

        const notification = new Notification({
            username: username,
            date: date,
            content: content,
            userID: userId,
            interactingUserUsername: interactingUserUsername,
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
        const notifications = await DataStore.query(Notification, (n) => n.userID.eq(userId), {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
        });

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

export async function deleteAllNotifications(notiUsername) {
    try {
        const notifications = await DataStore.query(Notification, (u) => u.username.eq(notiUsername._z));

        for (let i = 0; i < notifications.length; i++) {
            await DataStore.delete(notifications[i]);
        }
    } catch (error) {
        console.error("Error deleting all notifications", error);
    }
}