import React, { Component } from 'react';
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createTransaction } from '../redux/actions/transaction.action';

class Pay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumber: '',
      imagePayment: '',
    };
  }

  handleOnChange = (e) => {
    const input = e.target;
    // const value = input.value;

    if (input.type === 'file') {
      this.setState({ [input.name]: input.files[0] });
    }
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('attachment', this.state.imagePayment);

    this.props.createTransaction(data);
  };

  render() {
    const { loading, error, transactions } = this.props;

    return (
      <div>
        <Container className="main-wrapper">
          <Row className="justify-content-center">
            <Col className="profile-wrapper w-75 text-center" md="8">
              <h2 className="mb-4">Premium</h2>
              <p>
                Bayar sekarang dan nikmati streaming musik kekinian dari{' '}
                <strong className="color-red">DUMBSOUND</strong>
              </p>
              <p>
                <strong className="color-red">DUMBSOUND</strong> <strong>: 091231232</strong>
              </p>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form onSubmit={this.handleOnSubmit}>
                    <InputGroup className="">
                      <FormControl
                        name="accountNumber"
                        onChange={this.handleOnChange}
                        type="text"
                        placeholder="Input your account number"
                      />
                    </InputGroup>
                    <Form.File id="filePayment" className="mb-4">
                      <Form.File.Input name="imagePayment" onChange={this.handleOnChange} isValid />
                      <Form.File.Label
                        className="btn btn-white btn-full mt-3"
                        data-browse="Button text"
                      >
                        Attach proof of transfer
                      </Form.File.Label>
                    </Form.File>
                    <Button type="submit" className="btn btn-red btn-full">
                      Send
                    </Button>
                    <p className="text-success mt-2">
                      {(!error && !loading && Object.keys(transactions).length > 0) ||
                      transactions.length > 0
                        ? 'Payment has been sent successfully, please wait a moment'
                        : false}
                    </p>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin,
    user: state.authReducer.user,
    transactions: state.transactionReducer.transactions,
    loadingTransaction: state.transactionReducer.loading,
    errorTransaction: state.transactionReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTransaction: (value) => dispatch(createTransaction(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
