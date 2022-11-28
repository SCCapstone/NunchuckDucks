import { DataStore } from 'aws-amplify';
import { User, FollowedBy } from "../models";
import { getUserId } from './UserOperations';

/**
 * This method adds an external user to the primary user's followers list
 * @param {String} username this is the username of the user who will be followed
 * @param {String} followerUsername this is the username of the follower
 */
export async function createFollower(username, followerUsername) {
    try {
        const userId = await getUserId(username);

        if (doesFollowExist(followerUsername, userId)) {
            console.log(`${followerUsername} already follows ${username}`);
            return false;
        }
    
        const follower = new FollowedBy ({
            username: followerUsername,
            userID: userId
        })
        await DataStore.save(follower);
        console.log(`Follower ${followerUsername} of ${username} was saved successfully.`);
        return true;
    } catch (error) {
        console.error("Error saving follower.", error);
    }
}

/**
 * Check to see if the following relationship exists, this is to prevent someone following the same person twice
 * @param {String} username the username of the follower
 * @param {ID} userID the ID of the user being followed
 * @returns 
 */
async function doesFollowExist(username, userID) {
    try {
        const followerList = await DataStore.query(FollowedBy, (f) => f.and(f => [
            f.username("eq", username),
            f.userID("eq", userID)
        ]));

        return followerList.length >= 1 ? true : false;
        
    } catch (error) {
        console.error("Error retrieving follower list");
    }
}

/**
 * Gets the follower list of a specified user
 * @param {String} username the username of the root user i.e. the one whose followers list we're wanting
 * @returns a list of the followers of a given user
 */
export async function getFollowersList(username) {
    try {
        const rootUser = await DataStore.query(User, (u) => 
        u.username('eq', username));
        const followersList = await DataStore.query(FollowedBy, (f) => 
        f.userID('eq', rootUser[0].id));

        console.log(`Retrieve followers of ${username} succesfully.`);

        return followersList;
    } catch (error) {
        console.error("Error retrieving followers list.");
    }

}

/**
 * This method deletes the relationship between a follower and the one being followed
 * @param {String} username the username of the one being followed
 * @param {String} followerUsername the username of the follower
 */
export async function deleteFollower(username, followerUsername) {
    try {
        const userId = await getUserId(username);

        const followerToDelete = await DataStore.query(FollowedBy, (f) => f.and(f => [
            f.username("eq",followerUsername),
            f.userID("eq", userId)
        ]));

        await DataStore.delete(followerToDelete[0]);

        console.log(`${followerUsername} no longer follows ${username}`);
    } catch (error) {
        console.error("There was an error deleting follower.", error);
    }
}