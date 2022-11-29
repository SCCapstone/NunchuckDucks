import { DataStore } from "aws-amplify";
import { User } from "../models";

/**
 * Creates a user and saves the new user in the backend
 * @param {String} username 
 * @param {Image} profilePicture 
 * @param {String} bio 
 */
export async function createUser(username, profilePicture, bio) {
    try {
        await DataStore.save(
            new User ({
                username: username,
                profilePicture: profilePicture,
                bio: bio
            })
        );
        console.log(`User ${username} successfully created.`);
    } catch (error) {
        console.error("Error saving post", error);
    }
}

/**
 * Queries the database for a specific user, then deletes that user
 * @param {User} user 
 */
export async function deleteUser(username) {
    try {
        const userToDelete = findUserByUsername(username);
        DataStore.delete(userToDelete[0]);
        console.log(`Deleted ${username} successfully.`);
    } catch (error) {
        console.log("Error deleting user", error);
    }
}

/**
 * Queries the user table by username
 * @param {String} username 
 * @returns 
 */
export async function findUserByUsername(username) {
    try {
        const user = await DataStore.query(User, (u) => u.username("eq", username));
        if (user.length === 1)
            return user[0];
        else {
            console.log(`Could not find ${username}`);
            return null;
        }
    } catch (error) {
        console.error(`Error finding ${username}`, error);
    }
}

/**
 * This function gets the auto-generated ID of a User from the backend table
 * @param {String} username the username whose ID we want to retrieve
 * @returns String userId
 */
export async function getUserId(username) {
    try {
            const user = await DataStore.query(User, (u) => u.username("eq", username));

            console.log(`Found userID ${user[0].id} for ${username} successfully.`);

            return user[0].id;
    } catch (error) {
        console.error("Error finding user ID", error);
    }
}

/**
 * Updates the profile picture of the given user with a new profile picture.
 * @param {String} username the username of the user whose profile pic is being changed
 * @param {String} newProfilePicture the new profile picture
 */
export async function updateProfilePicture(username, newProfilePicture) {
    try {
        const userId = await getUserId(username);

        const original = await DataStore.query(User, userId);

        await DataStore.save(User.copyOf(original, updated => {
                updated.profilePicture = newProfilePicture
            })
        );
        //We may want to add in some code to delete the S3 file containing the old profile picture.
        
        console.log(`Successfully updated profile picture for ${username}.`);
    } catch (error) {
        console.error(`Error updating ${username} profile picture.`);
    }
}

/**
 * Updates the bio for the given user
 * @param {String} username the user whose bio is being changed
 * @param {String} newBio the new bio
 */
export async function updateBio(username, newBio) {
    try {
        const userId = await getUserId(username);

        const original = await DataStore.query(User, userId);

        await DataStore.save(User.copyOf(original, updated => {
                updated.bio = newBio
            })
        );
        
        console.log(`Successfully updated bio for ${username}.`);
    } catch (error) {
        console.error(`Error updating ${username} bio.`);
    }
}