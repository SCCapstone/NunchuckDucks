import { DataStore, SortDirection } from "aws-amplify";
import { Post, User } from "../models";
import { Storage } from "aws-amplify";
import { getCurrentUser } from "./CacheOperations";

/**
 * Creates a user and saves the new user in the backend
 * @param {String} username
 * @param {Image} profilePicture
 * @param {String} bio
 */
export async function createUser(username, profilePicture, bio) {
  try {
    await DataStore.save(
      new User({
        username: username,
        profilePicture: profilePicture,
        bio: bio,
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
    const user = await DataStore.query(User, (u) => u.username.eq(username));
    if (user.length === 1) return user[0];
    else {
      console.log(`Could not find ${username}`);
      return null;
    }
  } catch (error) {
    console.error(`Error finding ${username}`, error);
  }
}

/**
 * This function returns the profile picture
 * @param {String} username
 * @returns image
 */
export async function getProfilePicture(username) {
  try {
    const user = await DataStore.query(User, (u) => u.username.eq(username));
    const photoPath = user.profilePicture; //string path of photo
    const pic = await Storage.get(photoPath);
    return pic;
  } catch {
    return "";
    console.error("error getting image of current authenticated user");
  }
}

/**
 * This function gets the auto-generated ID of a User from the backend table
 * @param {String} username the username whose ID we want to retrieve
 * @returns String userId
 */
export async function getUserId(username) {
  try {
    const user = await DataStore.query(User, (u) => {
      return u.username.eq(username);
    });

    if (!user || !user.length) return "";

    return user[0].id;
  } catch (error) {
    console.error("Error finding user ID for", username, error);
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

    await DataStore.save(
      User.copyOf(original, (updated) => {
        updated.profilePicture = newProfilePicture;
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

    await DataStore.save(
      User.copyOf(original, (updated) => {
        updated.bio = newBio;
      })
    );

    console.log(`Successfully updated bio for ${username}.`);
  } catch (error) {
    console.error(`Error updating ${username} bio.`);
  }
}

export async function getBio(username) {
  try {
    const userId = await getUserId(username);

    const user = await DataStore.query(User, userId);

    console.log(`Successfully retrieved the bio for ${username}`);

    return user.bio;
  } catch (error) {
    console.error(`Error retrieving the bio for ${username}`, error);
  }
}

/**
 * Checks to see if the given username is the same as the current user
 * @param {String} username
 * @returns boolean
 */
export async function isCurrUser(username) {
  try {
    return username === (await getCurrentUser());
  } catch (error) {
    console.error(`Error checking is username is the current user.`, error);
  }
}

/**
 * Checks to see if the user with the given username exists in the database
 * @param {String} username
 * @returns Boolean
 */
export async function doesUserExist(username) {
  try {
    const user = await DataStore.query(User, (u) => u.username.eq(username));

    if (user[0] === undefined) console.log(`This user does not exist.`);

    return user[0] === undefined;
  } catch (error) {
    console.error(`Error checking if user exists.`, error);
  }
}

/**
 * Checks to see if the current user is a private user
 * @param {String} username
 * @returns Boolean
 */
export async function isUserPrivate(username) {
  try {
    const userId = await getUserId(username);
    const user = await DataStore.query(User, userId);

    console.log(`Found privacy status for ${username}`);
    return user.isPrivate;
  }catch(error) {
    console.error("Error finding privacy status ", error);
  }
}

export async function togglePrivacy(username, privacy) {
  try {
    const userId = await getUserId(username);

    const original = await DataStore.query(User, userId);

    await DataStore.save(
      User.copyOf(original, (updated) => {
        updated.isPrivate = privacy;
      })
    );

    console.log(`Successfully changed ${username}'s privacy status to ${privacy}`);
  } catch(error) {
    console.error(`Error changing ${username}'s privacy status to ${privacy}`)
  }
}

export async function getCurrentStreak(username) {
  try {
    const userId = await getUserId(username);

    const user = await DataStore.query(User, userId);
    console.log(`Successfully retrieved current streak for ${username}`);

    return user.currentStreak;
  }catch(error) {
    console.log("Error finding current streak ", error);
  }
}

export async function updateCurrentStreak(username) {
  try {
    var currDate = new Date();
    const userId = await getUserId(username);
    const streak = await getCurrentStreak(username);
    const needUpdate = await checkStreak(username);
    if (streak === null) {
      console.log("Current streak is null");
      const original = await DataStore.query(User, userId);

      await DataStore.save(
        User.copyOf(original, (updated) => {
          updated.currentStreak = 0;
        })
      );
    }
    else if (needUpdate === true && currDate.getDay() === 4) {
      const original = await DataStore.query(User, userId);
      
      await DataStore.save(
        User.copyOf(original, (updated) => {
          updated.currentStreak += 1;
        })
      );
      console.log(`Successfully updated current streak of ${username}`);
    }
    else if (needUpdate === false) {
      const original = await DataStore.query(User, userId);

      await DataStore.save(
        User.copyOf(original, (updated) => {
          updated.currentStreak = 0;
        })
      );
      console.log(`Successfully updated current streak of ${username}`);
    }
    else {
      console.log("No update needed");
    }
    const user = await DataStore.query(User, userId);
    return user.currentStreak;
  }catch(error) {
    console.error("Error updating streak ", error);
  }
}

export async function getUsersPostTimes(username) {
  try {
    const userId = await getUserId(username);

    const posts = [];

    const postList = await DataStore.query(Post, (p) => p.username.eq(username), {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    });

    for (let i = 0; i < postList.length; i++) {
      posts.push(postList[i].createdAt)
    }
    return posts;
  }catch(error) {
    console.error("Error retrieving users own posts ", error);
  }
}

export async function checkStreak(username) {
  const posts = await getUsersPostTimes(username);
  let goalDays = await getWeeklyGoal(username);
  if (goalDays > posts.length)
    return false;
  
  for (let i = 0; i < goalDays; i++) {
      var createdAtFormatted = posts[i].substring(0,19);
      var currDate = new Date();
      var dateUploaded = new Date(createdAtFormatted);
      var diff = currDate.getTime() - dateUploaded.getTime();
      var minutesDifference = diff / (1000 * 60);
      var hoursDifference = Math.floor(minutesDifference / 60);
      var daysDifference = Math.floor(hoursDifference / 24);
      if (daysDifference > 7) 
        return false;
  }
  return true;
}

export async function getWeeklyGoal(username) {
  try {
    const userId = await getUserId(username);

    const user = await DataStore.query(User, userId);
    console.log("Weekly goal: ", user.WeeklyGoal);
    const temp = user.WeeklyGoal;

    if (temp === null) {
      const original = await DataStore.query(User, userId);

      await DataStore.save(
        User.copyOf(original, (updated) => {
          updated.WeeklyGoal = 3;
        })
      );
      console.log("Weekly goal set to default");
    }

    console.log(`Successfully retrieved weekly goal for ${username}`);

    return user.WeeklyGoal;
  }catch(error) {
    console.error("Error getting weekly goal ", error);
  }
}

export async function setWeeklyGoal(username, weeklyGoal) {
  try {
    const userId = await getUserId(username);
    const original = await DataStore.query(User, userId);

    await DataStore.save(
      User.copyOf(original, (updated) => {
        updated.WeeklyGoal = weeklyGoal;
      })
    );
  }catch(error) {
    console.error("Error setting new weekly goal ", error);
  }
}