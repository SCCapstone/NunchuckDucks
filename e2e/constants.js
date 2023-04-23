export const mockUsername = "MOCK_USER";

export const mockPassword = "Mockpassword1";

export const mockCaption = "MOCK_CAPTION";

export const signInAction = async () => {
    await element(by.label("aws-amplify__auth--username-input")).tap();
        await element(by.label("aws-amplify__auth--username-input")).typeText(mockUsername);
        await element(by.label("aws-amplify__auth--password-input")).tap();
        await element(by.label("aws-amplify__auth--password-input")).typeText(mockPassword);
        await element(by.label("aws-amplify__auth--sign-in-button")).tap();
}