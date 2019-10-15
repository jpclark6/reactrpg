import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import calculateStatIncrease from './TaskStats';

const TaskShow = (props) => {
    const { id, task, auth } = props;
    if (!auth.uid) return <Redirect to='/signin' />
    if (task) {
        if (task.authorId !== auth.uid) return <Redirect to='/' />
        const increases = calculateStatIncrease(task);
        const complete = task.completed ? (
            <p>Completed. Successful? {task.successful.toString()}</p>
        ) : (
            <div>
                <h5>Completed?</h5>
                <Link to={'/quests/finish?id=' + id + '&success=true'}><h5 className="teal-text text-darken-4">Yes - Success</h5></Link>
                <Link to={'/quests/finish?id=' + id + '&success=false'}><h5 className="teal-text text-darken-4">Yes - Fail</h5></Link>
            </div>
        )

        return (
            <div className="container section task-show">
                <div className="card z-depth-0 skill-summary flow-text">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{task.title}</span>
                        <p className="grey-text">{task.description}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        {task.reward &&
                            <div>Rewared: {task.reward}</div>
                        }
                        <div>Difficulty: {task.difficulty}</div>
                        <div>Time: {task.time}</div>
                        <div>Category: {task.category}</div>
                        <div>Expected increases:</div>
                        <p>Strength: {increases.strength}</p>
                        <p>Intelligence: {increases.intelligence}</p>
                        <p>Stamina: {increases.stamina}</p>
                        <p>Grit: {increases.grit}</p>
                        <p>Karma: {increases.karma}</p>
                        <p>Luck: {increases.luck}</p>
                    </div>
                </div>
                { complete }
                <Link to='/'>
                    <h6 className="center teal-text text-darken-4">Back</h6>
                </Link>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const tasks = state.firestore.data.tasks;
    const task = tasks ? tasks[id] : null
    return {
        task: task,
        auth: state.firebase.auth,
        id: id
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid]] }
    ])
)(TaskShow);