import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
// import tree from '../../assets/tree-icon.png';

class Navbar extends Component {
    render() {
        return (
            <nav className="nav-wrapper teal darken-4">
                <Link to='/' className='brand-logo left'><i className="material-icons large">spa</i>FaahTree</Link>
                <SignedInLinks/>
                <SignedOutLinks/>
            </nav>
        )
    }
}

export default Navbar;
