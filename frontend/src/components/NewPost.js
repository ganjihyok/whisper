import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import style from './NewPost.module.css';

class NewPost extends React.Component {
  state = {
    body: '',
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { body } = this.state;
    const { onAddPost, auth, history } = this.props;
    e.preventDefault();
    if (body.trim()) {
      onAddPost({
        username: auth.user.username || 'Anonymous',
        body,
      }, history);
    }
  };

  render() {
    const { body } = this.state;

    return (
      <div className={style.postWrapper}>
          <form onSubmit={ this.handleSubmit }>
          <textarea
            className={style.postTextArea}
            cols="19"
            rows="8"
            name="body"
            onChange={ this.handleInputChange }
            value={body}>
          </textarea>
          <button className={style.submitBtn} type="submit" >
              WHISPER
          </button>
        </form>
      </div>
    );
  }
}

NewPost.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(NewPost));