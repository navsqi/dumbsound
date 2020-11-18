import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth.action';

class UserNavigation extends Component {
  render() {
    const { role } = this.props.user;
    return (
      <div className="ml-auto">
        <Dropdown className="user-navigation">
          <Dropdown.Toggle id="dropdown-basic">
            <img
              src="https://images.unsplash.com/photo-1518550835331-b89cdfee2443?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="User"
              className="photo-profile mr-3"
            ></img>
            {this.props.fullName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {role !== 'admin' ? (
              <Dropdown.Item href={`/pay/${this.props.user.id}`}>
                <i className="icon-red">
                  <img src={`${process.env.REACT_APP_BASE_URL}images/icons/attachment.svg`} alt="" />
                </i>
                Pay
              </Dropdown.Item>
            ) : (
              false
            )}

            {role === 'admin' ? (
              <>
                <Dropdown.Item href="/admin/add-music">
                  <i className="icon-red">
                    <img src={`${process.env.REACT_APP_BASE_URL}images/icons/vinyl.svg`} alt="" />
                  </i>
                  Add Music
                </Dropdown.Item>
                <Dropdown.Item href="/admin/add-artist">
                  <i className="icon-red">
                    <img src={`${process.env.REACT_APP_BASE_URL}images/icons/artist.svg`} alt="" />
                  </i>
                  Add Artist
                </Dropdown.Item>
              </>
            ) : (
              false
            )}
            <Dropdown.Item href="/admin/transactions">
              <i className="icon-red">
                <img src={`${process.env.REACT_APP_BASE_URL}images/icons/bill.svg`} alt="" />
              </i>
              Transaction
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.props.logout}>
              <i className="icon-red">
                <img src={`${process.env.REACT_APP_BASE_URL}images/icons/logout.svg`} alt="" />
              </i>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNavigation);
