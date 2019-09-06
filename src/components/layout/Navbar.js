import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
// import tree from '../../assets/tree-icon.png';

class Navbar extends Component {
    render() {
        const { auth } = this.props;
        const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
        return (
            <nav className="nav-wrapper teal darken-4">
                <Link to='/' className='brand-logo left'><i className="material-icons large">spa</i>FaahTree</Link>
                { links }
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);
