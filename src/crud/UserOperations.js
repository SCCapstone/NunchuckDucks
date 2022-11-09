import { DataStore } from "aws-amplify";

/**
 * Creates a user and saves the new user in the backend
 * @param {String} username 
 * @param {String} password 
 * @param {Image} profilePicture 
 * @param {String} bio 
 */
export async function createUser(username, password, profilePicture, bio) {
    try {
        await DataStore.save(
            new User ({
                username: username,
                password: password,
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
export async function deleteUser(user) {
    try {
        const userToDelete = await DataStore.query(user);
        DataStore.delete(userToDelete);
        console.log(`Deleted ${user.username} successfully.`);
    } catch (error) {
        console.log("Error deleting user", error);
    }
}