import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to='/quests/create'>New Quest</NavLink></li>
            <li><NavLink to='/'>Log Out</NavLink></li>
        </ul>
    )
}

export default SignedInLinks;