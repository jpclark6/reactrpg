import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import calculateStatIncrease from './TaskStats';
import TimeAgo from 'react-timeago';

const TaskShow = (props) => {
    const { id, task, auth } = props;
    if (!auth.uid) return <Redirect to='/signin' />
    if (task) {
        if (task.authorId !== auth.uid) return <Redirect to='/' />
        const increases = calculateStatIncrease(task);
        
        var difficulty;
        // eslint-disable-next-line 
        switch (true) {
            case (task.difficulty <= 2):
                difficulty = "Super easy. What are you waiting for!";
                break;
            case (task.difficulty <= 4):
                difficulty = "Easy. Why put it off?";
                break;
            case (task.difficulty <= 6):
                difficulty = "Medium. Maybe procrastinate one more day.";
                break;
            case (task.difficulty <= 8):
                difficulty = "Hard. Can't put it off forever!";
                break;
            case (task.difficulty > 8):
                difficulty = "Legendary. You can do it!";
                break;
        }

        var time;
        // eslint-disable-next-line 
        switch (true) {
            case (task.time <= 2):
                time = "Barely anything at all.";
                break;
            case (task.time <= 4):
                time = "A little time.";
                break;
            case (task.time <= 6):
                time = "This may take some time.";
                break;
            case (task.time <= 8):
                time = "Long. Better start now.";
                break;
            case (task.time > 8):
                time = "Basically forever.";
                break;
        }

        const footer = task.completed ? 
            task.successful ?
                <h5>Completed successfully <TimeAgo date={new Date(task.updatedAt.seconds * 1000).toLocaleString()} /> </h5>
                :
                <h5>Completed unsuccessfully <TimeAgo date={new Date(task.updatedAt.seconds * 1000).toLocaleString()} /> </h5>
         : (
            <div>
                <h5>Update quest status</h5>
                <Link to={'/quests/finish?id=' + id + '&success=true'}><span className="green-text text-darken-2" style={{padding: "10px 40px", fontSize: "80px"}}>{"\u2713"}</span></Link>
                <Link to={'/quests/finish?id=' + id + '&success=false'}><span className="red-text text-darken-2" style={{ padding: "10px 40px", fontSize: "80px" }}>X</span></Link>
            </div>
        )

        return (
            <div className="container section task-show center">
                <h4 style={{margin: "1px", padding: "1px"}} className="grey-text">Quest:</h4>
                <h3 className="" style={{ margin: "3px", padding: "3px" }}>{task.title}</h3>
                <blockquote style={{fontSize: "20px"}}>"{task.description}"</blockquote>
                <h4 style={{ margin: "1px", padding: "1px" }} className="grey-text">Stats:</h4>
                <h5 className="left-align"><b>Difficulty:</b> {difficulty}</h5>
                <h5 className="left-align"><b>Time:</b> {time}</h5>
                <h5 className="left-align"><b>Strength:</b> {increases.strength}</h5>
                <h5 className="left-align"><b>Intelligence:</b> {increases.intelligence}</h5>
                <h5 className="left-align"><b>Stamina:</b> {increases.stamina}</h5>
                <h5 className="left-align"><b>Grit:</b> {increases.grit}</h5>
                <h5 className="left-align"><b>Karma:</b> {increases.karma}</h5>
                <h5 className="left-align"><b>Luck:</b> {increases.luck}</h5>

                { footer }
                <Link to='/'>
                    <h5 className="center teal-text text-darken-4">Back</h5>
                </Link>
                <Link to={'/quests/delete?id=' + id }>
                    <h5 className="center teal-text text-darken-4">Delete</h5>
                </Link>
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
    const id = ownProps.match.params.id;
    const tasks = state.firestore.data.tasks;
    const task = tasks ? tasks[id] : null
    return {
        task: task,
        auth: state.firebase.auth,
        id: id
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid]] }
    ])
)(TaskShow);