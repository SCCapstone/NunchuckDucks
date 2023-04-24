import { signInAction } from "./constants";

const { device } = require("detox");

describe("Settings Screen Tests", () => {
    beforeAll(async () => {
        await device.launchApp();
        await signInAction();
      });

    beforeEach(async () => {
        await device.reloadReactNative();
      });

      it('Successfully navigates to the Settings screen', async () => {

        await element(by.id("Settings_Screen")).atIndex(0).tap();

        await expect(element(by.id("Settings_Screen_Header"))).toBeVisible();
      });

      it('Successfully signs the user out', async () => {
        await element(by.id("Settings_Screen")).atIndex(0).tap();

        await element(by.id("Sign_Out_Button")).tap();

        await expect(element(by.label("aws-amplify__auth--sign-up-button"))).toBeVisible();
      });

});