import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Post.module.css';

export default class Post extends Component {
    render() {
        const { post, gridPosition, newPost } = this.props;
        const regularPostStyle = {
          color: 'white',
        }
        const newPostStyle = {
            color: 'yellow',
        }
        const likedPostStyle = {
            color: 'purple',
        }
        return (
            <div className={style.Post} style={gridPosition}>
                <div className={style.starIcon} style={newPost ? (newPostStyle) : (regularPostStyle)}>
                    <i className="fas fa-star fa-2x" />
                </div>
                <div className={style.username}>
                    {post.username}
                </div>
                <div className={style.body}>
                    {post.body}
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    gridPosition: PropTypes.object.isRequired,
    new: PropTypes.bool.isRequired,
}