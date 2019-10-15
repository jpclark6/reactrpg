import React, { Component } from 'react';
import TaskDetails from './TaskDetails';
import { Link } from 'react-router-dom';

class TaskList extends Component {
    render() {
        const { tasks } = this.props;
        if (tasks) {
            var sortedTasks = tasks.slice().sort((a, b) => {
                return b.createdAt.seconds - a.createdAt.seconds
            })
            return (
                <div className="brown-text text-darken-4">
                    <h3 className="center">Quests</h3>
                    <Link to={'/quests/create'}>
                        <div className="center-align">
                            <p className="waves-effect waves-light btn-small teal darken-3">
                                <i className="material-icons left">create</i>Add New Quest
                            </p>
                        </div>
                    </Link>
                    {sortedTasks.map((task, i) => {
                        return (
                            <Link to={'/quests/' + task.id} key={i}>
                                <TaskDetails task={task} key={i} />
                            </Link>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <p>Add some quests!</p>
            )
        }
        
    }
}

export default TaskList;