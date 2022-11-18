import { DataStore } from 'aws-amplify';

export async function createGoal(username, goalNumber, date, content, userId) {
    try {
        const goal = new Goal ({
            username: username,
            goalNumber: goalNumber,
            date: date,
            content: content,
            userId: userId
        })
        await DataStore.save(goal);
        console.log(`Goal ${goal.id} successfully created.`);
    } catch (error) {
        console.error("Error saving goal", error);
    }
}

export async function deleteGoal(goal) {
    try {
        const goalToDelete = await DataStore.query(goal);
        DataStore.delete(goalToDelete);
        console.log(`Successfully delete goal ${goalToDelete.id}`);
    } catch (error) {
        console.error("Error saving goal", error);
    }
}