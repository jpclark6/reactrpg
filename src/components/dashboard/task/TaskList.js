import React, { Component } from 'react';
import TaskDetails from './TaskDetails'
import { connect } from 'react-redux'

class SkillList extends Component {
    render() {
        // console.log(this.props);
        const { tasks } = this.props;

        return (
            <div className="brown-text text-darken-4">
                <h3 className="center">Quests</h3>
                <div className="center-align"><a className="waves-effect waves-light btn-small teal darken-3"><i className="material-icons left">create</i>Add New Quest</a></div>
                { tasks.map((task, i) => {
                    return <TaskDetails task={task} key={i}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.task.tasks
    }
}

export default connect(mapStateToProps)(SkillList);