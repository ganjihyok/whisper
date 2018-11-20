import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser, loginUser } from '../actions/authentication';
import classnames from 'classnames';

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
        <div className="container" style={{ width: '20%'}}>
            <form>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Username"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.username
                    })}
                    name="username"
                    onChange={ this.handleInputChange }
                    value={ username }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.username}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={this.handleLogin}>
                        Sign in
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.handleSignup}>
                        Sign up
                    </button>
                </div>
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
