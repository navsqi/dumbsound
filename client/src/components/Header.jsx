import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import AuthButton from './AuthButton';
import UserNavigation from './UserNavigation';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }

  // Login between User Dropdown & Login/Register Page
  rightNavigation = () => {
    if (this.props.isLogin) {
      return <UserNavigation fullName={this.props.user.fullName} />;
    } else {
      return <AuthButton />;
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-black">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* <- Left Menu -> */}
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item mr-2">
                  <a href="/" className="nav-link">
                    <img src={`${process.env.REACT_APP_BASE_URL}images/logo.png`} alt="" />
                  </a>
                </li>
              </ul>

              {/* <- Button Register & Log In Right -> */}
              {this.rightNavigation()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin,
    user: state.authReducer.user,
    loading: state.authReducer.loading,
    error: state.authReducer.error,
  };
};

export default connect(mapStateToProps)(Header);
