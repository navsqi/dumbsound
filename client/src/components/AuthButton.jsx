import React, { Component } from 'react';
import { Button, Modal, InputGroup, FormControl, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login, register } from '../redux/actions/auth.action';
import Loader from 'react-loader-spinner';
import FlashMessage from 'react-flash-message';

class Auhtentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerShow: false,
      loginShow: false,
      data: {},
    };
  }

  // Handle Show Modal
  handleShow = (button) => {
    if (button === 'register') {
      return this.setState({ registerShow: true, loginShow: false });
    }

    return this.setState({ loginShow: true, registerShow: false });
  };

  // Handle Close Modal
  handleClose = (button) => {
    if (button === 'register') {
      return this.setState({ registerShow: false });
    }

    return this.setState({ loginShow: false });
  };

  // Handle Change on Form Input
  handleChange = (e) => {
    const { data } = this.state;
    const input = e.target;
    const value = input.value;

    this.setState({ data: { ...data, [input.name]: value } });
  };

  // Handle Form Login
  handleFormLogin = async (e) => {
    e.preventDefault();
    this.props.login({
      email: this.state.data.emailLogin,
      password: this.state.data.passwordLogin,
    });
  };

  // Handle Form Login
  handleFormRegister = async (e) => {
    e.preventDefault();
    this.props.register({
      email: this.state.data.email,
      fullName: this.state.data.fullName,
      password: this.state.data.password,
      gender: this.state.data.gender,
      phone: this.state.data.phone,
      address: this.state.data.address,
    });
  };

  render() {
    const { loading, error } = this.props;

    return (
      <>
        {/* <- Button Register & Log In Right -> */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Button
              onClick={() => this.handleShow('register')}
              className="nav-link btn mr-md-2 mb-2 mb-md-0 btn-white btn-sm"
              to="/"
            >
              Register
            </Button>
          </li>
          <li className="nav-item">
            <Button
              onClick={() => this.handleShow('login')}
              className="nav-link btn mr-md-2 mb-2 mb-md-0 btn-red btn-sm"
              to="/"
            >
              Log In
            </Button>
          </li>
          {/* <-Modal Register -> */}
          <Modal show={this.state.registerShow} onHide={() => this.handleClose('register')}>
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleFormRegister}>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Control name="gender" as="select" onChange={this.handleChange}>
                    <option value="male" defaultValue>
                      Male
                    </option>
                    <option value="female">Female</option>
                  </Form.Control>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    name="phone"
                    type="number"
                    placeholder="Phone"
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    name="address"
                    as="textarea"
                    placeholder="Address"
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <p className="text-center text-danger error-message">
                  <span>
                    {!loading && error ? (
                      <FlashMessage duration={3000}>{error.split(':')[1]}</FlashMessage>
                    ) : (
                      false
                    )}
                  </span>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" className="btn btn-red btn-full">
                  {this.props.loading ? (
                    <Loader type="Oval" color="white" height="20" width="20" stye="" />
                  ) : (
                    'Register'
                  )}
                </Button>
                <p onClick={() => this.handleShow('login')} className="form-text mt-2 helper-form">
                  Already have an account? <strong>Sign in</strong>
                </p>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* <-Modal Log In -> */}
          <Modal show={this.state.loginShow} onHide={() => this.handleClose('login')}>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleFormLogin}>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    type="email"
                    placeholder="nauval@dumbsound.com"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="emailLogin"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    type="password"
                    placeholder="••••••••"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="passwordLogin"
                  />
                </InputGroup>
                <p className="text-center text-danger error-message">
                  <span>
                    {!loading && error ? (
                      <FlashMessage duration={3000}>{error}</FlashMessage>
                    ) : (
                      false
                    )}
                  </span>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" className="btn btn-red btn-full">
                  {this.props.loading ? (
                    <Loader type="Oval" color="white" height="20" width="20" stye="" />
                  ) : (
                    'Log In'
                  )}
                </Button>
                <p
                  onClick={() => this.handleShow('register')}
                  className="form-text mt-2 helper-form"
                >
                  Don't have an account? <strong>Register</strong>
                </p>
              </Modal.Footer>
            </Form>
          </Modal>
        </ul>
      </>
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

const mapDispatchToProps = (dispatch) => {
  return {
    login: (value) => dispatch(login(value)),
    register: (value) => dispatch(register(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auhtentication);
