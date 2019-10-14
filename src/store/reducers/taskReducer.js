const initState = {
    tasks: [
        {
            id: '1',
            title: 'Example task',
            description: 'Load other tasks',
            reward: '',
            category: 'adulting',
            difficulty: 3,
            time: 1,
            recurring: 'NONE',
            completed: false,
            successful: false
        }
    ]
}

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TASK':
            console.log('created task', action.task);
            return state
        case 'CREATE_TASK_ERROR':
            console.log('create task error', action.err);
            return state
        case 'UPDATE_TASK':
            console.log('updated task', action.task);
            return state
        case 'UPDATE_TASK_ERROR':
            console.log('update task error', action.err);
            return state
        default:
            return state
    }
}

export default taskReducer