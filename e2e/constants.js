export const mockUsername = "MOCK_USER";

export const mockPassword = "Mockpassword1";

export const mockCaption = "MOCK_CAPTION";

export const mockWorkoutName = "MOCK_WORKOUT_NAME";

export const mockExerciseName = "MOCK_EXERCISE_NAME";

export const mockExerciseNotes = "MOCK_EXERCISE_NOTES";

export const mockGoal = "MOCK_GOAL";

export const mockBio = "MOCK_BIO";

export const mockUsername1 = "MOCK_USER_1";

export const mockPassword1 = "Password1";

export const signInAction = async () => {
    await element(by.label("aws-amplify__auth--username-input")).tap();
        await element(by.label("aws-amplify__auth--username-input")).typeText(mockUsername);
        await element(by.label("aws-amplify__auth--password-input")).tap();
        await element(by.label("aws-amplify__auth--password-input")).typeText(mockPassword);
        await element(by.label("aws-amplify__auth--sign-in-button")).tap();
}