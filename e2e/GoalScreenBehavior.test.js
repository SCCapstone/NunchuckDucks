import { signInAction, mockGoal } from "./constants.js";

const { device } = require("detox");

describe("Goal tests", () => {
  beforeAll(async () => {
    await device.launchApp();
    await signInAction();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Navigates to the goals screen successfully', async () => {
     await element(by.id("Goals_Screen")).atIndex(0).tap();
     await expect(element(by.id("Goals_Screen_Header"))).toBeVisible();
  });

  it('Successfully creates a goal', async () => {

     await element(by.id("Goals_Screen")).atIndex(0).tap();
     await element(by.id("Goal_Screen.Create_Goal_Button")).tap();
     await element(by.id("Goal_Screen.Create_Goal_Text_Input")).tap();
     await element(by.id("Goal_Screen.Create_Goal_Text_Input")).typeText(mockGoal);
     await element(by.id("Goal_Screen.Create_Goal_Submit_Button")).tap();

     await expect(element(by.text(mockGoal))).toBeVisible();
  });

  it('Successfully completes and then deletes a goal', async () => {

     await element(by.id("Goals_Screen")).atIndex(0).tap();
     await element(by.id("Goal_Screen.Incomplete")).tap();
     await element(by.id("Goals_Screen.Completed_Button")).tap();
     await expect(element(by.text(mockGoal))).toBeVisible();

     await element(by.id("Goal_Screen.Complete")).tap();
     await element(by.id("Goals_Screen.In_Progress_Button")).tap();
     await expect(element(by.text(mockGoal))).not.toBeVisible();
  });

  it('Created goal shows up on the goal summary page', async () => {
     await element(by.id("Goals_Screen")).atIndex(0).tap();
     await element(by.id("Goal_Screen.Create_Goal_Button")).tap();
     await element(by.id("Goal_Screen.Create_Goal_Text_Input")).tap();
     await element(by.id("Goal_Screen.Create_Goal_Text_Input")).typeText(mockGoal);
     await element(by.id("Goal_Screen.Create_Goal_Submit_Button")).tap();

     await element(by.id("Profile_Screen")).atIndex(0).tap();

     await expect(element(by.text(mockGoal))).toBeVisible();
     await element(by.id("Goals_Screen")).atIndex(0).tap();
     await element(by.id("Goal_Screen.Incomplete.Delete")).tap();
  });

});

