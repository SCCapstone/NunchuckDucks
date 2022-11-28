import { DataStore } from 'aws-amplify';
import { User, Follows } from "../models";

/**
 * Adds a user to the primary user's following list.
 * @param {String} username username of the root user i.e. the one who will be following the external user
 * @param {String} followedUsername username of the user that is to be followed
 */
export async function createFollowing(username, followedUsername) {
    const user = await DataStore.query(User, (u) => 
    u.username('eq', username));

    const userId = user[0].id;

    try {
        const follows = new Follows({
            username: followedUsername,
            userID: userId
        })
        await DataStore.save(follows);

        console.log(`User ${user[0].username} followed ${follows.username} successfully.`);
    } catch (error) {
        console.error(`There was an error trying to follow the user.}`, error);
    }
}

/**
 * Returns a list of all the people that a user follows
 * @param {String} username the user whose following list we're trying to get
 * @returns a list of all the users a given user follows
 */
export async function getFollowsList(username) {
    try {
    const rootUser = await DataStore.query(User, (u) =>
    u.username('eq', username));
    const followsList = await DataStore.query(Follows, (f) => 
    f.userID('eq', rootUser[0].id));

    console.log(`Successfully retrieved follows list for ${username}.`);
    
    return followsList;
    } catch (error) {
        console.error(`Error retrieving follows list for ${username}`);
    }
} 