import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import calculateStatIncrease from './TaskStats';
import { updateTask } from '../../../store/actions/taskActions';

const TaskSuccess = (props) => {
    const { tasks, auth, location } = props;
    const id = location.search.split('&')[0].slice(4,);
    const success = ("true" === location.search.split('&')[1].slice(8,));
    if (!auth.uid) return <Redirect to='/signin' />
    if (tasks) {
        const task = tasks.find((task) => {
            return task["id"] === id;
        });
        if (task.authorId !== auth.uid) return <Redirect to='/' />
        const increases = calculateStatIncrease(task);
        if (task.completed === false) {
            props.updateTask(task, true, success);
        }
        return (
            <p className="hello">{increases["intelligence"]}</p>
        )
    } else {
        return (
            <p className="hello">Loading task.</p>
        )
    }
}

const mapStateToProps = (state) => {
    const tasks = state.firestore.ordered.tasks;
    console.log("state", state)
    return {
        tasks: tasks,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (task, completed, success) => dispatch(updateTask(task, completed, success))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid]] }
    ])
)(TaskSuccess);

/////////////
// const mapStateToProps = (state) => {
//     return {
//         auth: state.firebase.auth
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         createTask: (task) => dispatch(createTask(task))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)