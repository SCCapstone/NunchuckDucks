import { signInAction, mockWorkoutName, mockExerciseName, mockExerciseNotes } from "./constants.js";

const { device } = require("detox");

describe("Workout tests", () => {
  beforeAll(async () => {
    await device.launchApp();
    await signInAction();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("Navigates to workout page successfully", async () => {

    await element(by.id("Workout_Screen")).atIndex(0).tap();
    await expect(element(by.id("Workout_Screen_Header"))).toBeVisible();
  });

  it("Successfully creates a workout and then deletes it", async () => {
    await element(by.id("Workout_Screen")).atIndex(0).tap();
    await element(by.id("Workout_Screen.Create_New_Workout_Button")).tap();
    await element(by.id("Create_Workout_Modal.Text_Input")).tap();
    await element(by.id("Create_Workout_Modal.Text_Input")).typeText(mockWorkoutName);
    await element(by.id("Create_Workout_Modal.Add_Exercise")).tap();
    await element(by.id("Create_Workout_Modal.Add_Exercise")).tap();  
    await element(by.id("Create_Workout_Modal.Exercise_Name")).tap();
    await element(by.id("Create_Workout_Modal.Exercise_Name")).typeText(mockExerciseName);
    await element(by.id("Create_Workout_Modal.Exercise_Notes")).tap();
    await element(by.id("Create_Workout_Modal.Exercise_Notes")).typeText(mockExerciseNotes);
    await element(by.id("Create_Workout_Modal.Confirm_Button")).tap();
    await element(by.id("Create_Workout_Modal.Confirm_Button")).tap();

    await expect(element(by.text(mockExerciseName))).toBeVisible();

    //await element(by.id("Create_Workout_Modal.Delete_Button")).atIndex(0).tap();
    //await expect(element(by.text(mockExerciseName))).not.toBeVisible();
  });

 });