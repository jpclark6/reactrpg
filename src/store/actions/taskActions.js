export const createTask = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tasks').add({
            ...task,
            authorId: 12345,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_TASK', task });
        }).catch((err) => {
            dispatch({ type: 'CREATE_TASK_ERROR', err})
        })
    }
}