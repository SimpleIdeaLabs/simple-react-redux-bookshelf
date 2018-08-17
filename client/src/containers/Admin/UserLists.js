import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUsers, clearUsersList} from '../../actions';

class UserLists extends React.Component {

  componentWillMount() {
    this.props.clearUsersList();
    this.props.getUsers();
  }

  render() {
    if (!this.props.users) return null;
    return (
      <div>
        {
          this.props.users.map((user, key) => {
            return (
              <div key={key}>{user.username}</div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    getUsers,
    clearUsersList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLists);