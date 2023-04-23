import { signInAction, mockCaption } from "./constants.js";

const { device } = require("detox");

describe("Create Post Tests", () => {
    beforeAll(async () => {
        await device.launchApp();
      });

    beforeEach(async () => {
        await device.reloadReactNative();
      });

    /*it("Navigates to the create post screen and creates a basic post", async () => {
        await signInAction();

        await element(by.id("HomeHeader.Create_Post_Button")).tap();
        await element(by.id("HomeHeader.Create_Post_Caption")).typeText(mockCaption);
        await element(by.id("HomeHeader.Create_Post_Submit")).tap();

        await expect(element(by.text(mockCaption))).toBeVisible();
    });*/
});