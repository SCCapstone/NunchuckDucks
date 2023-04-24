# Gymbit

Gymbit is an app that combines social media and fitness tracking into one cohesive environment.
The app allows users to set their fitness goals and track their progress on them while also following
other users and seeing their progress as well. Aside from setting goals and seeing other users goals
and progress a user can post once a day with a photo or video of their workout and a short description
of what their workout for the day was. Other users can then see this post on their feed and interact
with it through likes and comments.

The files for our Gymbit project can be accessed through (https://github.com/SCCapstone/NunchuckDucks).
In order to run and compile the project the user will need to install node.js to their local machine, and
expo go to their phone, the links for both are included in the external requirements section. After these
are installed, clone the github repository and navigate to that folder in your terminal. Then follow the instructions
in the external Requirements section, the Setup section, and finally the Run section.

## External Requirements

Below are the external requirements for Windows OS:

In order to build this project you first need to complete the steps below:

1. Below is the required software needed to be installed to run the application:

   - Computer Installation:
     § [Node.js](https://nodejs.org/en/)
   - Phone Installation:
     § Need to download the "EXPO" app of the android or IOS app store.

2. After installing Node JS, download the application -folder and paste it into a folder on your local device.

## Setup

First, we need to install expo-cli through your PowerShell terminal. Open the terminal and navigate to the application directory and run the following command: `Npx install -g expo-cli`

Then, run `npm i` to install all the packages the project uses.

After installing, you may have a few vulnerabilities so we will now run: `npx audit fix`

If there are errors with a script running you will need to do the following in a separate terminal and then repeat the steps above:

1. Open another PowerShell terminal on your windows device as an ADMINISTRATOR.
2. Run the following command: `get-ExecutionPolicy`
3. If your device says "restricted" you may need to set it to unrestricted in order for the appropriate scripts to run.
4. To change this, run the command: `set-ExecutionPolicy`
5. Now enter: `unrestricted` and the problem running scripts should be resolved.
6. You can change this back to restricted the exact same way, just change your entry from unrestricted to `restricted`.

## Running

To run the app, use one of the following commands.
`expo start`
`npm start`
`yarn start`

The user can then either use a connected emulator or a web browser to use the app.
The user can also download the Expo Go app and scan the QR code with their smartphone camera to use the app.

# Deployment

Webapps need a deployment section that explains how to get it deployed on the
Internet. These should be detailed enough so anyone can re-deploy if needed
. Note that you **do not put passwords in git**.

Mobile apps will also sometimes need some instructions on how to build a
"release" version, maybe how to sign it, and how to run that binary in an
emulator or in a physical phone.

# Testing

## Unit Tests

To run unit tests, simply run the command `npm test`

- You may need to run `npm i` before running npm test to ensure all dependencies are downloaded

The Unit tests are located at ./src/library/\*.test.js

In 492 you will write automated tests. When you do you will need to add a
section that explains how to run them.

The unit tests are in `/test/unit`.

The behavioral tests are all located at e2e/*.test.js.

## Testing Technology

No test runners required

## Behavioral Tests

The behavioral (end-to-end) tests are in `/e2e/starter.test.js`

To run the end-to-end test, perform these steps:

(For iOS)
1. Download the application binary from the Expo Dev builds section. Decompress the file; it should become a folder of type Application, and named "NunchuckDucks.app".
2. Open two terminals. In one, run the app with `npm start`
3. In the other, enter the command `detox test --configuration <config>`
   1. `<config>` should be one of the configurations listed under .detoxrc.js
      1. If using an iOS emulator, consider using **ios.sim.release for `<config>`**\

(For Android)
1. In `.detoxrc.js` make sure to change the name of the emulator under `devices.emulator.device.avdName` to the name of the emulator
you are using. (if you are using an emulator)
2. If using windows make sure the path in `.detoxrc.js` under `apps.android.release.build` has `&&` instead of `;` and double back-slashes
instead of a single forward slash. If using a Mac, these configurations should be the opposite.
3. run the command `detox build -c android.emu.release`. Or download the .apk to the path `android/app/build/outputs/apk/release/app-release.apk`.js
4. run the command `detox test <test-file-name> -c android.emu.release`. The <test-file-name> is the name of the individual detox test suite
you want to run. If you want to run them all, run `detox test -c android.emu.release`

**The tess files generally take about 1-3 minutes each to run completely**

# Authors

Tyler Barrett: tylerbarrett01@gmail.com

Cort Miles: cort.miles@outlook.com

Kennedy Fairey: kgfairey11@gmail.com

Nathan Dolbir: nathandolbir@gmail.com

Bryson Carroll: bryson2809@gmail.com
