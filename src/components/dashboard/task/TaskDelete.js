import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { deleteTask } from '../../../store/actions/taskActions';

const TaskDelete = (props) => {
    const { tasks, auth, location } = props;
    const id = location.search.slice(4,);
    const questDeletedText = (
        <div className='center'>
            <h3>Quest deleted</h3>
            <Link to='/'><h5 className="center teal-text text-darken-4">Home</h5></Link>
        </div>
    )
    if (!auth.uid) return <Redirect to='/signin' />
    if (tasks) {
        const task = tasks.find((task) => {
            return task["id"] === id;
        });

        if (task) {
            if (task && task.authorId !== auth.uid) return <Redirect to='/' />
            props.deleteTask(task);
        }

        return (
            questDeletedText
        )
    } else {
        return (
            questDeletedText
        )
    }
}

const mapStateToProps = (state) => {
    const tasks = state.firestore.ordered.tasks;
    return {
        tasks: tasks,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (task) => dispatch(deleteTask(task))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid]] }
    ])
)(TaskDelete);
