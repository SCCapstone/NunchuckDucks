import { signInAction, mockCaption } from "./constants.js";

const { device } = require("detox");

describe("Create Post Tests", () => {
    beforeAll(async () => {
        await device.launchApp();
        await signInAction();
      });

    beforeEach(async () => {
        await device.reloadReactNative();
      });

    it("Navigates to the create post screen and types a caption", async () => {
        await element(by.id("Mutual_Screen.Empty_Create_Post")).tap();
        await element(by.id("HomeHeader.Create_Post_Caption")).tap();
        await element(by.id("HomeHeader.Create_Post_Caption")).typeText(mockCaption);

        await expect(element(by.text(mockCaption))).toBeVisible();
    });
});