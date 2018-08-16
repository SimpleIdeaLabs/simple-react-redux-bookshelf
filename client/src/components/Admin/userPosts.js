import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserPosts } from '../../actions';
import { Link } from 'react-router-dom';

class UserPosts extends React.Component {

  componentWillMount() {
    this.props.getUserPosts();
  }

  renderPosts = (posts) => {
    return posts.map((post, key) => {
      return (
        <div key={key}>
          <hr />
          <Link to={`/books/${post.id}/edit`}>
            { post.name }
          </Link>
        </div>
      )
    });
  }

  render() {
    if (!this.props.posts) return null;
    return (
      <div>
        <h2>User Posts</h2>
        {this.renderPosts(this.props.posts)}
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.users.posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    getUserPosts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);