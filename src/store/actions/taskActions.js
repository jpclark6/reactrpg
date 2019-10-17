export const createTask = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        firestore.collection('tasks').add({
            ...task,
            authorId: authorId,
            createdAt: new Date(),
            updatedAt: ""
        }).then(() => {
            dispatch({ type: 'CREATE_TASK', task });
        }).catch((err) => {
            dispatch({ type: 'CREATE_TASK_ERROR', err})
        })
    }
}

export const updateTask = (task, completed, success) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tasks').doc(task.id).update({
            completed: completed,
            successful: success,
            updatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'UPDATE_TASK', task });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_TASK_ERROR', err })
        })
    }
}