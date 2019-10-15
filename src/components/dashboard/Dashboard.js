import React, { Component } from 'react';
import StatList from './stat/StatList';
// import SkillList from './skill/SkillList';
import TaskList from './task/TaskList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        const { tasks, auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <StatList profile={profile} tasks={tasks}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <TaskList tasks={tasks}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid]] }
    ])
)(Dashboard);