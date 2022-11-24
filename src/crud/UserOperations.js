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
        const user = await DataStore.query((u) => u.username("eq", username));
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

export async function getUserId(username) {
    try {
        const user = await DataStore.query(User, (u) => u.username(username));

        console.log(`Found userID ${user[0].id} successfully.`);

        return user[0].id;
    } catch (error) {
        console.error("Error finding user ID", error);
    }
}