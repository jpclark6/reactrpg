import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createTask } from '../../../store/actions/taskActions';
import { Redirect } from 'react-router-dom';

class CreateTask extends Component {
    state = {
        title: '',
        description: '',
        reward: '',
        category: '',
        difficulty: 0,
        time: 0,
        recurring: 'NONE',
        completed: false,
        successful: false
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        // console.log(e.target.value);
    }
    handleNumChange = (e) => {
        this.setState({
            [e.target.id]: parseInt(e.target.value)
        })
        // console.log(e.target.value);
    }
    handleCheckboxChange = (e) => {
        const checked = !this.state.completed
        this.setState({
            [e.target.id]: checked
        })
        // console.log(checked);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.createTask(this.state)
        this.props.history.push(`/`)
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3 center">Create Quest</h5>
                    <div className="input-field">
                        <label htmlFor="title">Quest Title<span className="red-text">*</span> </label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="reward">Reward (optional)</label>
                        <input type="text" id="reward" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <p htmlFor="category" className="grey-text">Category<span className="red-text">*</span></p>
                        <p>
                            <label>
                                <input id="category" value="adulting" name="category" type="radio" onChange={this.handleChange} />
                                <span>Adulting</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="category" value="fun" name="category" type="radio" onChange={this.handleChange} />
                                <span>Fun</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="category" value="exercise" name="category" type="radio" onChange={this.handleChange} />
                                <span>Exercise</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="category" value="chore" name="category" type="radio" onChange={this.handleChange} />
                                <span>Chore</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="category" value="work" name="category" type="radio" onChange={this.handleChange} />
                                <span>Work</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <p className="range-field grey-text">
                            Difficulty (1 easy - 10 hard)<span className="red-text">*</span><input type="range" id="difficulty" min="1" max="10" steps="1" onChange={this.handleNumChange} />
                        </p>
                    </div>
                    <div className="input-field">
                        <p className="range-field grey-text">
                            Time (1 short - 10 long)<span className="red-text">*</span><input type="range" id="time" min="1" max="10" steps="1" onChange={this.handleNumChange} />
                        </p>
                    </div>
                    <div className="input-field">
                        <p htmlFor="recurring" className="grey-text">Recurring<span className="red-text">*</span></p>
                        <p>
                            <label>
                                <input id="recurring" value="none" name="recurring" type="radio" onChange={this.handleChange}/>
                                <span>None</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="recurring" value="daily" name="recurring" type="radio" onChange={this.handleChange}/>
                                <span>Daily</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="recurring" value="weekly" name="recurring" type="radio" onChange={this.handleChange}/>
                                <span>Weekly</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="recurring" value="monthly" name="recurring" type="radio" onChange={this.handleChange}/>
                                <span>Monthly</span>
                            </label>
                        </p>
                    </div>
                    <label htmlFor="completed">
                        <input type="checkbox" id="completed" value="completed" onChange={this.handleCheckboxChange} />
                        <span>Already completed</span>
                    </label>
                    <div className="input-field center">
                        <button className="btn teal darken-4 z-depth-0">Submit</button>
                    </div>
                </form>
                <div>
                    <h4>Estimated experience:</h4>
                    <p>Strength +2</p>
                    <p>Intelligence +1</p>
                    <p>Karma -2</p>
                    <p>Luck +1</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (task) => dispatch(createTask(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)