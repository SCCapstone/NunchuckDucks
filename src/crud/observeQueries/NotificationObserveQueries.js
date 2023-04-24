import { DataStore } from "aws-amplify";
import { Notification } from "../../models";
import { getUserId } from "../UserOperations";

/**
 * Return a subscription of notificationCount
 *
 * @param {String} username user notifications 
 * @param {String} setNotificationCount getting the amount of notifications of the user.
 * @returns subscription
 */

export async function getAndObserveNotificationCount(
  username,
  setRetrieveNotificationCount
) {
  try {
    const userId = await getUserId(username);
    const subscription = DataStore.observe(Notification, (n) =>
      n.userID.eq(userId)
    ).subscribe(
      (snapshot) => {
        setRetrieveNotificationCount(Math.random());
      },
      (error) => {
        console.error("Notification Count subscription Error: ", error);
      }
    );
    return subscription;
  } catch (error) {
    console.error("Retrieving notification count subscription:", error);
  }
}
