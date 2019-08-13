import React from 'react';
import TaskDetails from './TaskDetails'

const SkillList = () => {
    return (
        <div className="brown-text text-darken-4">
            <h3 className="center">Quests</h3>
            <div className="center-align"><a className="waves-effect waves-light btn-small teal darken-3"><i className="material-icons left">create</i>Add New Quest</a></div>
            <TaskDetails />
            <TaskDetails />
            <TaskDetails />
        </div>
    )
}

export default SkillList;