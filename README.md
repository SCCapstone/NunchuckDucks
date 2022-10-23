# Gymbit

Gymbit is an app that combines social media and fitness tracking into one cohesive environment.
The app allows users to set their fitness goals and track their progress on them while also following
other users and seeing their progress as well.  Aside from setting goals and seeing other users goals
and progress a user can post once a day with a photo or video of their workout and a short description
of what their workout for the day was.  Other users can then see this post on their feed and interact 
with it through likes and comments.

The files for our Gymbit project can be accessed through (https://github.com/SCCapstone/NunchuckDucks).
In order to run and compile the project the user will need to install node.js to their local machine, and
expo go to their phone, the links for both are included in the external requirements section.  After these
are installed, clone the github repository and navigate to that folder in your terminal.  In the terminal
type the following commands:
npm install
npm audit fix
Once these commands are executed you can then run the following command to launch the app on a server:
npx expo start
Once this is complete there will be a QR code in the terminal that you can scan using the Expo Go app and 
this will launch the app on your phone.  Now when there are edits made to the source code that will be reflected 
in the app displayed through expo go.  

## External Requirements

Below are the external requirements for Windows OS:

In order to build this project you first need to complete the steps below:

Note: All executable commands are in " ", do not use the quotes when running the command in your terminal.

	1. Below is the required software needed to be installed to run the application:
		- Computer Installation:
			§ [Node.js](https://nodejs.org/en/)
		- Phone Installation:
			§ Need to download the "EXPO" app of the android or IOS app store.

	2. After installing Node JS, download the application -folder and paste it into a folder on your local device.

	3. Next, we need to install expo-cli through your PowerShell terminal. Open the terminal and navigate to the application directory and run the following command: "Npx install -g expo-cli"

	4. After installing, you may have a few vulnerabilities so we will now run one of the two following commands: "npx audit fix" or "npm audit fix"
	
	5. Now we will also need to start the app by running the following command:
	"npx start"
	
	6. Now there should be a QR code you can scan (off of your phone) to run the app. It should redirect and open the EXPO app after scanning the QR code with your camera. The app should automatically download to the device, and then it should run. It may take a minute or so to download if the application hasn’t been ran on the phone before.

	7. If there are errors with a script running you will need to do the following in a separate terminal and then repeat steps 3-6:
		○ Open another PowerShell terminal on your windows device as an ADMINISTRATOR.
		○ Run the following command: "get-ExecutionPolicy"
		○ If your device says "restricted" you may need to set it to unrestricted in order  for the appropriate scripts to run.
		○ To change this, run the command: "set-ExecutionPolicy"
		○ Now enter: "unrestricted" and the problem running scripts should be resolved. 
		○ You can change this back to restricted the exact same way, just change your entry from unrestricted to "restricted".

## Setup

Here you list all the one-time things the developer needs to do after cloning
your repo. Sometimes there is no need for this section, but some apps require
some first-time configuration from the developer, for example: setting up a
database for running your webapp locally.

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

In 492 you will write automated tests. When you do you will need to add a
section that explains how to run them.

The unit tests are in `/test/unit`.

The behavioral tests are in `/test/casper/`.

## Testing Technology

In some cases you need to install test runners, etc. Explain how.

## Running Tests

Explain how to run the automated tests.

# Authors

Your names and emails
