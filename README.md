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

List all the stuff the reader will need to install in order to get you app to
run in their laptop. For example:

In order to build this project you first have to install:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

If possible, list the actual commands you used to install these, so the reader
can just cut-n-paste the commands and get everything setup.

You only need to add instructions for the OS you are using.

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
