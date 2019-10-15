import React from 'react'

const TaskDetails = ({task}) => {
    var classes;
    if (task.completed === true) {
        if (task.successful === true) {
            classes = "card z-depth-0 skill-summary flow-text green lighten-3"
        } else {
            classes = "card z-depth-0 skill-summary flow-text red lighten-3"
        }
    } else {
        classes = "card z-depth-0 skill-summary flow-text lighten-3"
    }
    var myDate = new Date(task.createdAt.seconds * 1000);
    const date = (myDate.toLocaleString());
    return (
        <div className={classes}>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{task.title}</span>
                <p>{task.description}</p>
                <p className="grey-text">{task.category} - difficulty: {task.difficulty}, time: {task.time} </p>
                <p className="grey-text">Created at: {date}</p>
            </div>
        </div>
    )
}

export default TaskDetails;