import { signInAction, mockUsername1 } from "./constants";

const { device } = require("detox");

describe("Followers Screen Tests", () => {
    beforeAll(async () => {
        await device.launchApp();
        await signInAction();
      });

    beforeEach(async () => {
        await device.reloadReactNative();
      });

      it('Navigates to the followers page successfully', async () => {
        await element(by.id("Followers_Screen")).atIndex(0).tap();

        await expect(element(by.id("Follower_Screen_Header"))).toBeVisible();
      });

      it('Successfully follows MOCK_USER_1', async () => {
        await element(by.id("Followers_Screen")).atIndex(0).tap();
        await element(by.id("Follower_Screen.Follower_New_User")).tap();
        await element(by.id("Follower_Screen.Search_Bar")).tap();
        await element(by.id("Follower_Screen.Search_Bar")).typeText(mockUsername1);

        await element(by.id("Follower_Screen.Follow_Button")).atIndex(0).tap();
        await element(by.id("Follower_Screen.Follow_Button")).atIndex(0).tap();
        await expect(element(by.id("Follower_Screen.Follower.Delete")).atIndex(0)).toBeVisible();
      });

      it('Successfully deletes a follower', async () => {
        await element(by.id("Followers_Screen")).atIndex(0).tap();

        await element(by.id("Follower_Screen.Follower.Delete")).atIndex(0).tap();
        await element(by.id("Follower_Screen.Follower.Confirm_Delete")).tap();
        
        await expect(element(by.text(mockUsername1))).not.toBeVisible();
      });

});