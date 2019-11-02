import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    const { auth } = props;
    return (
        <ul className="right">
            <li><NavLink to='/quests/create'>{auth.email}</NavLink></li>
            <li><button onClick={props.signOut} style={{color: "white", backgroundColor: "transparent", borderStyle: "none"}}>Log Out</button></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);