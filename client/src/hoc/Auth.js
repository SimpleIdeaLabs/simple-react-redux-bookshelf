import React from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../actions';
import { bindActionCreators } from 'redux';

export default (ComposedClass, reload = true) => {
  class AuthenticationCheck extends React.Component {

    state = {
      loading: false
    }

    showLoading() {
      return <div className="loader">Loading...</div>;
    }

    componentWillMount() {
      this.props.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.login.token) {
        if (reload === true) {
          this.props.history.push('/login');
        }
      } else {
        if (reload === false) {
          this.props.history.push('/user');
        }
      } 
    }

    render() {
      if(this.state.loading) return this.showLoading();
      return <ComposedClass {...this.props} userData={this.props.login} />
    }

  }
  const mapStateToProps = (state, ownProps) => {
    return {
      login: state.users.login
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
      checkAuth
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}