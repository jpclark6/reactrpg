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
        const attVutes = {
            strength: profile.attributes.strength + increases.strength,
            grit: profile.attributes.grit + increases.grit,
            intelligence: profile.attributes.intelligence + increases.intelligence,
            karma: profile.attributes.karma + increases.karma,
            luck: profile.attributes.luck + increases.luck,
            stamina: profile.attributes.stamina + increases.stamina,
            xp: profile.attributes.xp + increases.xp,
            level: Math.floor(Math.sqrt(profile.attributes.xp + increases.xp) / 10)
        }

        if (task.completed === false) {
            props.updateTask(task, true, success);
            if (success === true) {
                props.updateUser(task.authorId, attVutes);
            }
        }
        const points = (
            <div className="points">
                <h4>Xp: {increases.xp}</h4>
                <h4 style={{ margin: "1px" }}>Strength: {attVutes.strength}</h4>
                <h4 style={{ margin: "1px" }}>Grit: {attVutes.grit}</h4>
                <h4 style={{ margin: "1px" }}>Intelligence: {attVutes.intelligence}</h4>
                <h4 style={{margin: "1px"}}>Stamina: {attVutes.stamina}</h4>
                <h4 style={{margin: "1px"}}>Karma: {attVutes.karma}</h4>
                <h4 style={{margin: "1px"}}>Luck: {attVutes.luck}</h4>
            </div>
        )
        return success ? (
            <div className="card z-depth-0 skill-summary flow-text">
                <div className="card-content center">
                    <h2 className="green-text text-darken-2">Quest completed!</h2>
                    <h4>"{task.title}"</h4>
                    <h4 className="grey-text text-darken-1">Gained Points:</h4>
                    {points}
                </div>
                <div className="center">
                    <Link to='/'style={{fontSize: "35px"}}>Home</Link>
                </div>
            </div>
        ) : (
            <div className="card z-depth-0 skill-summary flow-text red-text text-darken-2">
                <div className="card-content">
                    <h3>Quest failed:</h3>
                    <h4>{task.title}</h4>
                    <h4>Missed Points:</h4>
                    {points}
                    <Link to='/'>Home</Link>
                </div>
            </div>
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
