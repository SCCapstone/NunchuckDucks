import { signInAction, mockBio } from "./constants.js";


const { device } = require("detox");

describe("Profile Screen Tests", () => {
    beforeAll(async () => {
        await device.launchApp();
        await signInAction();
      });

    beforeEach(async () => {
        await device.reloadReactNative();
      });

      it('Navigates to the Profile Screen successfully', async () => {

        await element(by.id("Profile_Screen")).atIndex(0).tap();
        await expect(element(by.id('Profile_Screen_Header'))).toBeVisible();
      });

      it('Creates a new bio on the profile screen', async () => {
        await element(by.id("Profile_Screen")).atIndex(0).tap();

        await element(by.id("Profile_Screen.Bio")).tap();
        await element(by.id("Profile_Screen.Bio_Modal.Text_Input")).tap();
        await element(by.id("Profile_Screen.Bio_Modal.Text_Input")).typeText(mockBio);
        await element(by.id("Profile_Screen.Bio_Modal.Confirm_Button")).tap();

        await expect(element(by.text(mockBio))).toBeVisible();
      });
    
    it('Navigates to the Followers page by clicking on the follower number', async () => {
        await element(by.id("Profile_Screen")).atIndex(0).tap();

        await element(by.id("Profile_Screen.Follower_Number")).tap();

        await expect(element(by.id("Follower_Screen_Header"))).toBeVisible();
    });




});