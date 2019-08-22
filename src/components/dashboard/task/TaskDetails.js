import React from 'react'

const TaskDetails = ({task}) => {
    var classes;
    if (task.completed === true) {
        classes = "card z-depth-0 skill-summary flow-text grey lighten-3"
    } else {
        classes = "card z-depth-0 skill-summary flow-text lighten-3"
    }
    return (
        <div className={classes}>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{task.title}</span>
                <p>{task.description}</p>
                <p className="grey-text">{task.category} - difficulty: {task.difficulty}, time: {task.time} </p>
            </div>
        </div>
    )
}

export default TaskDetails;