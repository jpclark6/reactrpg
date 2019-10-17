import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import '../../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import calculateStatIncrease from '../task/TaskStats';

class SkillsChart extends Component {
    render() {
        const { tasks } = this.props;
        if (tasks) {
            console.log(tasks);
            var finishedCompletedTasks = tasks.filter(task => task.completed === true && task.successful === true);
            var sortedFinishedTasks = finishedCompletedTasks.sort((a, b) => {
                return a.updatedAt.seconds - b.updatedAt.seconds
            })
            if (sortedFinishedTasks.length > 1) {
                const timelineLength = sortedFinishedTasks[sortedFinishedTasks.length - 1].updatedAt.seconds - sortedFinishedTasks[0].updatedAt.seconds
                console.log(sortedFinishedTasks)
                console.log(timelineLength)
            }
            var statIncrease = [];
            sortedFinishedTasks.forEach((task) => {
                statIncrease.push(calculateStatIncrease(task))
            })

            var runningTotalXp = 0;
            var loc = 0
            var taskData = [];
            var tickData = [];
            sortedFinishedTasks.forEach((task) => {
                runningTotalXp += statIncrease[loc].xp
                // taskData.push({ x: task.updatedAt.seconds - sortedFinishedTasks[0].updatedAt.seconds, y: runningTotalXp });
                taskData.push({ x: task.updatedAt.seconds, y: runningTotalXp });
                tickData.push({ x: (task.updatedAt.seconds * 1000).toLocaleString()})
            })
            console.log(statIncrease);
            console.log(taskData);
        }

        const data = [
            { x: 0, y: 8 },
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 3, y: 9 },
            { x: 4, y: 1 },
            { x: 5, y: 7 },
            { x: 6, y: 6 },
            { x: 7, y: 3 },
            { x: 8, y: 2 },
            { x: 9, y: 0 }
        ];

        return (
            <div style={{margin: '15px 10px'}}>
                <div className="center">
                    <h4>XP over time</h4>
                </div>
                <XYPlot height={300} width={300} margin={{left: 40, right: 10, top: 10, bottom: 120}} title={'xp'}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Date" tickLabelAngle={-90} tickFormat={v => new Date(v * 1000).toDateString()}/>
                    <YAxis title="Total XP" />
                    <LineSeries data={taskData} curve={'curveBundle'}/>
                </XYPlot>
            </div>
        );
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
)(SkillsChart);