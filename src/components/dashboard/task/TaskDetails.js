import React from 'react';
import TimeAgo from 'react-timeago';

const TaskDetails = ({task}) => {
    var cardClasses;
    var textClasses;
    var card;
    var updatedString;
    var success;
    
    const createdDate = new Date(task.createdAt.seconds * 1000);
    const createdDateString = (createdDate.toLocaleString());
    
    if (task.hasOwnProperty('updatedAt') && task.updatedAt !== "") {
        var updatedDate = new Date(task.updatedAt.seconds * 1000);
        const updatedDateString = (updatedDate.toLocaleString());
        updatedString = <p className="grey-text">Completed <TimeAgo date={updatedDateString} /></p>
    } else {
        updatedString = "";
    }

    if (task.completed === true) {
        if (task.successful === true) {
            cardClasses = "card z-depth-1 skill-summary flow-text center";
            textClasses = "card-title green-text text-darken-2";
            success = "\u2713";
        } else {
            cardClasses = "card z-depth-1 skill-summary flow-text center";
            textClasses = "card-title red-text text-darken-2";
            success = "X";
        }
        card = (
            <div className={cardClasses}>
                <div className="card-content grey-text text-darken-3">
                    <span className={textClasses}>{success} "{task.title}"</span>
                    <p className="grey-text">Created <TimeAgo date={createdDateString} /></p>
                    {updatedString}
                </div>
            </div>
        );
    } else {
        cardClasses = "card z-depth-1 skill-summary flow-text center";
        textClasses = "card-title black-text";
        card = (
            <div className={cardClasses}>
                <div className="card-content grey-text text-darken-3">
                    <span className={textClasses}>"{task.title}"</span>
                    <p>{task.description}</p>
                    <p className="grey-text">Created <TimeAgo date={createdDateString} /></p>
                    {updatedString}
                </div>
            </div>
        );
    }

    return (
        card
    )
}

export default TaskDetails;