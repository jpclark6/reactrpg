import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const TaskShow = (props) => {
    const { task } = props;
    if (task) {
        return (
            <div className="container section task-show">
                <div className="card z-depth-0 skill-summary flow-text">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{task.title}</span>
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
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    const id = ownProps.match.params.id;
    const tasks = state.firestore.data.tasks;
    const task = tasks ? tasks[id] : null
    return {
        task: task
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'tasks' }
    ])
)(TaskShow);