# Project Name

This first paragraph should be a short description of the app. You can add links
to your wiki pages that have more detailed descriptions.

Your audience for the Readme.md are other developers who are joining your team.
Specifically, the file should contain detailed instructions that any developer
can follow to install, compile, run, and test your project. These are not only
useful to new developers, but also to you when you have to re-install everything
because your old laptop crashed. Also, the teachers of this class will be
following your instructions.

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

Specify the commands for a developer to run the app from the cloned repo.

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
