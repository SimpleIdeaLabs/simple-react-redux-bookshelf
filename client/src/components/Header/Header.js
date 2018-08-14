import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import AppSideNav from '../AppSideNav/AppSideNav';

class Header extends React.Component {

  state = {
    showNav: false
  }

  showSideNav() {
    this.setState({showNav: true});
  }

  onHideNav() {
    this.setState({showNav: false});
  }

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome 
            name="bars"
            style={{
              color: '#ffffff',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={()=>this.showSideNav()}
          />
        </div>
        <AppSideNav
          showNav={this.state.showNav}
          onHideNav={()=>this.onHideNav()}
        />
        <Link to="/" className="logo">
          The Bookshelf
        </Link>
      </header>
    )
  }

}

export default Header;