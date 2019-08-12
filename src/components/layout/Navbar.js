import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

class Navbar extends Component {
    render() {
        return (
            <nav className="nav-wrapper green darken-4">
                <div className="container">
                    <Link to='/' className='brand-logo'>FaahTree</Link>
                    <SignedInLinks className="hide-on-med-and-down" />
                    <SignedOutLinks className="hide-on-med-and-down" />
                </div>
            </nav>
        )
    }
}

export default Navbar;