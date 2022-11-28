import { DataStore } from 'aws-amplify';
import { Goal } from '../models';

export async function createGoal(username, date, content, userId) {
    try {
        const goal = new Goal ({
            username: username,
            date: date,
            content: content,
            userID: userId
        })
        await DataStore.save(goal);
        console.log(`Goal ${goal.id} successfully created.`);
    } catch (error) {
        console.error("Error saving goal", error);
    }
}

export async function deleteGoal(goalID) {
    try {
        const goalToDelete = await DataStore.query(Goal, goalID);
        DataStore.delete(goalToDelete);
        console.log(`Successfully delete goal ${goalToDelete.id}`);
    } catch (error) {
        console.error("Error saving goal", error);
    }
}