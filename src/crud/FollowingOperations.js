import { DataStore } from 'aws-amplify';

/**
 * Adds a user to the primary user's following list.
 * @param {*} username username of the root user i.e. the one who will be following the external user
 * @param {*} followedUsername username of the user that is to be followed
 */
export async function createFollowing(username, followedUsername) {
    const user = await DataStore.query(User, (u) => 
    u.username('eq', username));

    const userId = user.userId;

    try {
        const follows = new Follows({
            username: followedUsername,
            userId: userId
        })
        await DataStore.save(follows);

        console.log(`User ${user.username} followed ${follows.username} successfully.`);
    } catch (error) {
        console.error(`There was an error following ${follows.username}`, error);
    }
}

/**
 * Returns a list of all the people that a user follows
 * @param {*} username the user whose following list we're trying to get
 * @returns a list of all the users a given user follows
 */
export async function getFollowsList(username) {
    try {
    const rootUserId = await DataStore.query(User, (u) =>
    u.username('eq', username));
    const followsList = await DataStore.query(Follows, (f) => 
    f.userId('eq', rootUserId));

    console.log(`Successfully retrieved follows list for ${username}.`);
    
    return followsList;
    } catch (error) {
        console.error(`Error retrieving follows list for ${username}`);
    }
} 