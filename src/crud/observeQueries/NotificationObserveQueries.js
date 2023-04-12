import { DataStore } from "aws-amplify";
import { Notification } from "../../models";
import { getUserId } from "../UserOperations";

/**
 * Return a subscription of notificationCount
 *
 * @param {String} username
 * @param {Function} setNotificationCount
 * @returns subscription
 */
export async function getAndObserveNotificationCount(username, setNotificationCount) {
  try {
    const userId = await getUserId(username);
    const subscription = await DataStore.observeQuery(Notification, (n) =>
      n.userID.eq(userId)
    ).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      if (isSynced) setNotificationCount(items.length);
    });
    console.log("RETURN NOTIFICATION SUBSCRIPTION");
    return subscription;
  } catch (error) {
    console.error("Retrieving notification count subscription:", error);
  }
}
