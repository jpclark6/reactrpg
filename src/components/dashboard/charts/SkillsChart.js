import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import '../../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, MarkSeries } from 'react-vis';
import calculateStatIncrease from '../task/TaskStats';

class SkillsChart extends Component {
    render() {
        const { tasks } = this.props;
        if (tasks) {
            var finishedCompletedTasks = tasks.filter(task => task.completed === true && task.successful === true);
            var sortedFinishedTasks = finishedCompletedTasks.sort((a, b) => {
                return a.updatedAt.seconds - b.updatedAt.seconds
            })
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
        }

        return (
            <div style={{margin: '15px 10px'}}>
                <div className="center">
                    <h4>XP History</h4>
                </div>
                <XYPlot height={300} width={300} margin={{left: 40, right: 10, top: 10, bottom: 120}} title={'xp'}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Date" tickLabelAngle={-90} tickFormat={v => new Date(v * 1000).toDateString()}/>
                    <YAxis title="Total XP" />
                    <LineSeries data={taskData} curve={'curveBundle'}/>
                    <MarkSeries data={taskData} />
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