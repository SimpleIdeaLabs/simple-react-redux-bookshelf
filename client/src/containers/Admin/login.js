import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { bindActionCreators } from 'redux';

class Login extends React.Component {

  state = {
    username:'',
    password: '',
    error: '',
    success: false
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user.token) {
      this.props.history.push('/user');
    }
  }

  handleInputUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handleInputPassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser({
      username: this.state.username,
      password: this.state.password
    }); 
  }

  render() {
    let user = this.props.user;
    return(
      <div className="rl_container">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <h2>Login Here</h2>
          <div className="form_element">
            <input type="text" placeholder="Enter your username..."
              value={this.state.username}
              onChange={this.handleInputUsername}
            />
          </div>
          <div className="form_element">
            <input type="password" placeholder="Enter your password..." 
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Login</button>
          
          <div className="error">
            {
              user && user.error ?
                <div>{user.error}</div>
                : null
            }
          </div>

        </form> 
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.users.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);