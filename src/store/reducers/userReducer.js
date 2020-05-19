const initState = {
    attributes: {
        grit: 0,
        intelligence: 0,
        karma: 0,
        level: 1,
        luck: 0,
        stamina: 0,
        strength: 0,
        xp: 0
    },
    firstName: "Bob",
    isEmpty: false,
    isLoaded: true,
    lastName: "Bobalo"
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            console.log('updated user', action.attributes);
            return state
        case 'UPDATE_USER_ERROR':
            console.log('update user error', action.err);
            return state
        default:
            return state
    }
}

export default userReducer