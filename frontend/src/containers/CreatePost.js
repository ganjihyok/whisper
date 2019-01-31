import { connect } from 'react-redux';
import { createPost } from '../actions/post';
import NewPost from '../components/NewPost';

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: (post, history) => {
      dispatch(createPost(post, history));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewPost);