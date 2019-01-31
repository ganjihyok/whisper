import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllPosts } from '../actions/post';
import gridPosition from '../gridPosition';
import Post from './Post';
import style from './PostList.module.css';
// <input className={style.postBtn} type="image" src="https://data.whicdn.com/images/169940359/original.gif" onClick={this.togglePostModule} />

class PostList extends Component {
    componentDidMount() {
      const { fetchAllPosts } = this.props;
      fetchAllPosts();
    }
    render() {
        const { newPost, posts } = this.props;
        console.log(newPost);
        return (
            <div className={style.PostList}>
                {posts.map((post, ind) => {
                    return (
                        <Post key={post._id} newPost={false} post={post} gridPosition={gridPosition.gridPosition[ind]} />
                    )
                })}
                {newPost.body && <Post key={newPost._id} newPost={true} post={newPost} gridPosition={gridPosition.gridPosition[10]} /> }
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    newPost: state.newPost,
})

export default connect(mapStateToProps, { fetchAllPosts })(withRouter(PostList));