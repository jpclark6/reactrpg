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

export const updateTaskTick = (id, recurring) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        var recur = [];
        if (recurring !== 'daily') {
            recur = [...recurring, new Date()];
        } else {
            recur = [new Date()];
        }
        firestore.collection('tasks').doc(id).update({
            recurring: recur
        }).then(() => {
            dispatch({ type: 'UPDATE_TASK_TICK', id });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_TASK_TICK_ERROR', err })
        })
    }
}

export const deleteTask = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tasks').doc(task.id).delete().then(() => {
            dispatch({ type: 'DELETE_TASK', task });
        }).catch((err) => {
            dispatch({ type: 'DELETE_TASK_ERROR', err })
        })
    }
}