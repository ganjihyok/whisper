import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import style from './Navbar.module.css';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <div className={style.logoutBtn} onClick={this.onLogout.bind(this)}>
                <i className="fas fa-sign-out-alt" />
            </div>
        )
        const guestLinks = (
            <Link className={style.accountBtn} to="/register">
                <i className="fas fa-user fa-1x" />
            </Link>
        )
        return(
            <nav className={style.nav}>
                <div className={style.topRightBtn}>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));