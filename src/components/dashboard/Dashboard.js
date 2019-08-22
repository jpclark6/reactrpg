import React, { Component } from 'react';
import StatList from './stat/StatList';
// import SkillList from './skill/SkillList';
import TaskList from './task/TaskList';
import { firestoreConnect } from 'react-redux-firebase';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <StatList />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <TaskList />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;