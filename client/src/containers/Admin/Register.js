import React from 'react';
import { connect } from 'react-redux';
import { registerUser, clearNewUser } from '../../actions';
import { bindActionCreators } from 'redux';

class Register extends React.Component {

  state = {
    username: '',
    password: '',
    error: ''
  }

  handleInputChange(e, name) {
    this.setState({
      [name]: e.target.value
    });
  }

  componentWillMount() {
    this.props.clearNewUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.newUser) {
      this.props.history.push(`/users`);
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.registerUser({
      username: this.state.username,
      password: this.state.password
    });
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={(e) => this.submitForm(e)}>
          <h2>Add User</h2>
          <div className="form_element">
            <input type="text" placeholder="Enter username..."
              value={this.state.username}
              onChange={(e) => this.handleInputChange(e, 'username')}
            />
          </div>
          <div className="form_element">
            <input type="password" placeholder="Enter password..."
              value={this.state.password}
              onChange={(e) => this.handleInputChange(e, 'password')}
            />
          </div>
          <button type="submit">
            Register
          </button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  console.log(state, 'Map to props');
  return {
    newUser: state.users.newUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    registerUser,
    clearNewUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);