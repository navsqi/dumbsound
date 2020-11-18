import React, { Component } from 'react';
import TableTransaction from '../components/TableTransaction';

import { Container } from 'react-bootstrap';

class Transaction extends Component {
  render() {
    return (
      <>
        <Container className="main-wrapper">
          <h1 className="mb-4">Incoming Transaction</h1>
          <TableTransaction />
        </Container>
      </>
    );
  }
}

export default Transaction;
