// https://www.npmjs.com/package/aws-amplify-react-native?activeTab=code
// the withAuthenticator testIDs can be found in this repo ^^ at /aws-amplify-react-native/src/AmplifyTestIDs.js

import { signInAction } from "./constants.js";

const { device } = require("detox");

describe("Sign In Tests", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("Navigates to the sign-up page", async () => {
    await element(by.label("aws-amplify__auth--sign-up-button")).tap();
    await expect(element(by.text("Sign Up"))).toExist();
  });

  it("Signs into an account successfully", async () => {
    await signInAction();

    await expect(element(by.id("mutualScreen"))).toBeVisible();
  });
});
