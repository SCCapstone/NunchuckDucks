import { DataStore } from 'aws-amplify';

/**
 * This method adds an external user to the primary user's followers list
 * @param {*} username this is the username of the user who will be followed
 * @param {*} followerUsername this is the username of the follower
 */
export async function createFollower(username, followerUsername) {
    const user = await DataStore.query(User, (u) => 
    u.username('eq', username));

    const userId = user.userId;
    
    try {
        const follower = new FollowedBy ({
            username: followerUsername,
            userId: userId
        })
        await DataStore.save(follower);
        console.log(`Follower ${follower.id} of ${username} was saved successfully.`);
    } catch (error) {
        console.error("Error saving follower.", error);
    }
}

/**
 * Gets the follower list of a specified user
 * @param {*} username the username of the root user i.e. the one whose followers list we're wanting
 * @returns a list of the followers of a given user
 */
export async function getFollowersList(username) {
    try {
        const rootUserId = await DataStore.query(User, (u) => 
        u.username('eq', username));
        const followersList = await DataStore.query(FollowedBy, (f) => 
        f.userId('eq', rootUserId));

        console.log(`Retrieve followers of ${username} succesfully.`);

        return followersList;
    } catch (error) {
        console.error("Error retrieving followers list.");
    }

}