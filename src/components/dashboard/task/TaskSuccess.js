import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import calculateStatIncrease from './TaskStats';
import { updateTask } from '../../../store/actions/taskActions';
import { updateUser } from '../../../store/actions/userActions';

const TaskSuccess = (props) => {
    const { tasks, auth, location, profile } = props;
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
            if (success === true) {
                const xp = profile.attributes.xp + increases.strength + increases.grit + increases.intelligence + increases.karma + increases.luck + increases.stamina;
                const attVutes = {
                    strength: profile.attributes.strength + increases.strength,
                    grit: profile.attributes.grit + increases.grit,
                    intelligence: profile.attributes.intelligence + increases.intelligence,
                    karma: profile.attributes.karma + increases.karma,
                    luck: profile.attributes.luck + increases.luck,
                    stamina: profile.attributes.stamina + increases.stamina,
                    xp: xp,
                    level: Math.floor(Math.sqrt(xp) / 10)
                }
                props.updateUser(task.authorId, attVutes);
            }
        }
        return (
            <p className="hello">Nice Work!</p>
        )
    } else {
        return (
            <p className="hello">Loading task.</p>
        )
    }
}

const mapStateToProps = (state) => {
    const tasks = state.firestore.ordered.tasks;
    return {
        tasks: tasks,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (task, completed, success) => dispatch(updateTask(task, completed, success)),
        updateUser: (id, attributes) => dispatch(updateUser(id, attributes))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid]] }
    ])
)(TaskSuccess);
