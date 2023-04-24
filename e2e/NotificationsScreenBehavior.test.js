import { signInAction, mockUsername1, mockPassword1, mockUsername } from "./constants";

const { device } = require("detox");

describe("Create Post Tests", () => {
    beforeAll(async () => {
        await device.launchApp();
        await signInAction();
      });

    beforeEach(async () => {
        await device.reloadReactNative();
      });

    it('Successfully navigates to the notifications page',  async () => {
        await element(by.id("HomeHeader.Notifications_Button")).tap();
        await expect(element(by.id("Notifications_Screen"))).toBeVisible();
    });

    it('Successfully creates a notification by MOCK_USER_1 following MOCK_USER', async () => {
        await element(by.id("Settings_Screen")).atIndex(0).tap();

        await element(by.id("Sign_Out_Button")).tap();

        await element(by.label("aws-amplify__auth--username-input")).tap();
        await element(by.label("aws-amplify__auth--username-input")).typeText(mockUsername1);
        await element(by.label("aws-amplify__auth--password-input")).tap();
        await element(by.label("aws-amplify__auth--password-input")).typeText(mockPassword1);
        await element(by.label("aws-amplify__auth--sign-in-button")).tap();

        await element(by.id("Followers_Screen")).atIndex(0).tap();
        await element(by.id("Follower_Screen.Follower_New_User")).tap();
        await element(by.id("Follower_Screen.Search_Bar")).tap();
        await element(by.id("Follower_Screen.Search_Bar")).typeText(mockUsername);

        await element(by.id("Follower_Screen.Follow_Button")).atIndex(0).tap();
        await element(by.id("Follower_Screen.Follow_Button")).atIndex(0).tap();
        await element(by.id("Settings_Screen")).atIndex(0).tap();

        await element(by.id("Sign_Out_Button")).tap();

        await signInAction();
        await element(by.id("HomeHeader.Notifications_Button")).tap();
        await expect(element(by.id("Notifications_Delete_All"))).toBeVisible();
    });

    it('Successfully deletes the notification with the Delete All button', async () => {
        await element(by.id("HomeHeader.Notifications_Button")).tap();
        await element(by.id("Notifications_Delete_All")).tap();
        await expect(element(by.text(mockUsername1))).not.toBeVisible();

        await element(by.id("Notifications_Back_Arrow")).tap();
        await element(by.id("Settings_Screen")).atIndex(0).tap();

        await element(by.id("Sign_Out_Button")).tap();

        await element(by.label("aws-amplify__auth--username-input")).tap();
        await element(by.label("aws-amplify__auth--username-input")).typeText(mockUsername1);
        await element(by.label("aws-amplify__auth--password-input")).tap();
        await element(by.label("aws-amplify__auth--password-input")).typeText(mockPassword1);
        await element(by.label("aws-amplify__auth--sign-in-button")).tap();

        await element(by.id("Followers_Screen")).atIndex(0).tap();
        await element(by.id("Follower_Screen.Follower.Delete")).atIndex(0).tap();
        await element(by.id("Follower_Screen.Follower.Confirm_Delete")).tap();
    });

});