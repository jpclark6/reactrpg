const initState = {
    tasks: [
        {
            id: '1',
            title: 'Do the dishes',
            description: 'Do the dishes tonight',
            reward: '',
            category: 'adulting',
            difficulty: 3,
            time: 1,
            recurring: 'NONE',
            completed: false,
            successful: false
        },
        {
            id: '2',
            title: 'Win lottery',
            description: 'Must be at least $50',
            reward: '$50+',
            category: 'fun',
            difficulty: 9,
            time: 1,
            recurring: 'NONE',
            completed: true,
            successful: false
        },
        {
            id: '3',
            title: 'Something nice',
            description: 'Be nice to someone',
            reward: '',
            category: 'exercise',
            difficulty: 1,
            time: 1,
            recurring: 'NONE',
            completed: true,
            successful: true
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
        default:
            return state
    }
}

export default taskReducer