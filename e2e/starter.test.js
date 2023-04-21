const { device } = require("detox");

describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("Navigates to the sign-up page", async () => {
    await element(by.label("aws-amplify__auth--sign-up-button")).tap();
    expect(element(by.id("Sign_Up_Page"))).toBeVisible();
  });
});
