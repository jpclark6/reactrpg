import React from 'react'

const TaskShow = (props) => {
    const id = props.match.params.id;
    return (
        <div className="container section task-show">
            <div className="card z-depth-0 skill-summary flow-text">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">Skill Title - {id}</span>
                    <p>Something something</p>
                    <p className="grey-text">Date something</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted onSomething Something</div>
                    <div>2nd of September, 2am</div>
                </div>
            </div>
        </div>
    )
}

export default TaskShow;