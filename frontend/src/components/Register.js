import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser, loginUser } from '../actions/authentication';
import style from './Register.module.css';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignup(e) {
      // e.preventDefault();
      const { username, password } = this.state;
      const { registerUser, history } = this.props;

      const user = {
        username,
        password,
      }
      registerUser(user, history)
    }

    handleLogin(e) {
      // e.preventDefault();
      const { username, password } = this.state;
      const { loginUser } = this.props;

      const user = {
        username,
        password,
      }
      loginUser(user);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { username, password, errors } = this.state;
        return(
        <div className={style.registerModule}>
            <form className={style.fieldForm}>
                <div className={style.username}>
                    <input
                    type="text"
                    placeholder="Username"
                    className={style.inputField}
                    name="username"
                    onChange={ this.handleInputChange }
                    value={ username }
                    />
                    {errors.name && (<div className={style.usernameErr}>{errors.username}</div>)}
                </div>
                <div className={style.password}>
                    <input
                    type="password"
                    placeholder="Password"
                    className={style.inputField}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ password }
                    />
                    {errors.password && (<div className={style.passwordErr}>{errors.password}</div>)}
                </div>
                <button type="button" className={style.signinBtn} onClick={this.handleLogin}>
                    Sign in
                </button>
                <button type="button" className={style.signupBtn} onClick={this.handleSignup}>
                    Sign up
                </button>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser, loginUser })(withRouter(Register));
