import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearPosts } from '../actions/post';
import CreatePost from '../containers/CreatePost';
import style from './Home.module.css';
// <input className={style.postBtn} type="image" src="https://data.whicdn.com/images/169940359/original.gif" onClick={this.togglePostModule} />

class Home extends Component {
    componentDidMount() {
        const { clearPosts } = this.props;
        clearPosts([]);
    }

    onClick() {
        const { history, clearPosts } = this.props;
        history.push('/');
        clearPosts([]);
    }


    render() {
        const { auth, posts } = this.props;
        const logoStyle = {
            fontSize: '6vw',
        };
        if (posts.length !== 0) {
          logoStyle.fontSize = '3vw';
          logoStyle.transform = 'translate(0, -630%)';
          logoStyle.cursor = 'pointer';
        }
        const welcomeMsg = (
            <div className={style.welcomeMsg}>
                Welcome
                {' '}
                <div className={style.username}>
                    {auth.user.username}
                </div>
            </div>
        )
        const logo = (
            <div className={style.logo} style={logoStyle} onClick={this.onClick.bind(this)}>
                What's on your mind?
            </div>
        )
        const postModule = (
            <div className={style.postBtnWrapper}>
                <CreatePost />
            </div>
        )

        const postListBtn = (
            <Link className={style.postListBtn} to="/posts">
                Hear their whispers
            </Link>
        )
        const renderCondition = (auth, posts) => {
          if (auth.isAuthenticated && posts.length === 0) {
            return true;
          }
          return false;
        }

        return (
            <div className={style.home}>
                {renderCondition(auth, posts) && welcomeMsg}
                {logo}
                {posts.length === 0 && postModule}
                {posts.length === 0 && postListBtn}
            </div>
        )
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    posts: state.posts,
})

export default connect(mapStateToProps, { clearPosts })(withRouter(Home));