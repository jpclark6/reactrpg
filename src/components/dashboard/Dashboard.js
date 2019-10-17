import React, { Component } from 'react';
import StatList from './stat/StatList';
// import SkillList from './skill/SkillList';
import TaskList from './task/TaskList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import SkillsChart from './charts/SkillsChart';

class Dashboard extends Component {
    state = {
        toShow: false,
        hideChartText: 'Show Chart'
    }
    
    toggleChart = () => {
        console.log("Button click", this.state.toShow);
        this.state.toShow === true ? 
            this.setState({ toShow: false }) : this.setState({ toShow: true });
        this.state.toShow === true ? 
            this.setState({ hideChartText: 'Show Chart' }) : this.setState({ hideChartText: 'Hide Chart' });
    }

    render() {
        const { tasks, auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        
        const buttonStyle = {border: '1px solid grey', 
            backgroundColor: 'white', 
            borderRadius: '3px',
            padding: '4px',
            margin: '10px 2px 4px 2px'}

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <StatList profile={profile} tasks={tasks}/>
                        <div className="center">
                            <button id="hide-chart" onClick={this.toggleChart} style={buttonStyle}>{this.state.hideChartText}</button>
                        </div>
                        {this.state.toShow ? <SkillsChart /> : null}
            
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
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid || "5"]] }
    ])
)(Dashboard);