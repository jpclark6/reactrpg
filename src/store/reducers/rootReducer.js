import authReducer from './authReducer';
import taskReducer from './taskReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    user: userReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer