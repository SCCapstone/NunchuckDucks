const { device } = require("detox");

describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("Sign in page shows text", async () => {
    await expect(element(by.text("Sign in to your account"))).toBeVisible();
  });
});
