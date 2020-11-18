import React, { Component } from 'react';
import { Table, Dropdown, DropdownButton, InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTransactions, updateTransaction } from '../redux/actions/transaction.action';
import S from 'string';
import * as dayjs from 'dayjs';

class TableTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = { statusTransactions: '' };
  }

  componentDidMount() {
    this.props.getTransactions();
  }

  handleOnClick = (e) => {
    e.preventDefault();

    const { transaction, status } = e.target.dataset;
    // console.log(transaction, status);

    if (transaction && status === 'approved') {
      this.props.updateTransaction({ status: 'approved' }, transaction);
      setTimeout(() => {
        this.props.getTransactions();
      }, 250);
    } else if (transaction && status === 'cancel') {
      this.props.updateTransaction({ status: 'cancel' }, transaction);
      setTimeout(() => {
        this.props.getTransactions();
      }, 250);
    }
  };

  handleOnChange = (e) => {
    const input = e.target;
    const value = input.value;

    this.setState({ statusTransactions: value });
  };

  render() {
    let number = 1;
    const { role } = this.props.user;
    const { transactions, loading, error } = this.props;
    const { statusTransactions } = this.state;

    let trans = [...transactions];

    if (statusTransactions !== '') {
      trans = transactions.filter((el) => el.status === statusTransactions);
    }

    return (
      <>
        <InputGroup className="mb-3">
          <Form.Control onChange={this.handleOnChange} name="statusTransactions" as="select">
            <option value="">- All Transactions Status -</option>
            <option value="pending"> Pending </option>
            <option value="cancel"> Cancel </option>
            <option value="approved"> Approved </option>
          </Form.Control>
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Attachment</th>
              <th>Expires</th>
              <th>Status User</th>
              <th>Status Payment</th>
              {role === 'admin' ? <th>Action</th> : false}
            </tr>
          </thead>
          <tbody>
            {!loading && !error && transactions.length > 0
              ? trans.map((transaction) => {
                  let diffDate = dayjs(transaction.dueDate).diff(dayjs(new Date(Date.now())), 'day');

                  return (
                    <tr key={transaction.id}>
                      <td>{number++}</td>
                      <td>{transaction.user.fullName}</td>
                      <td>
                        <a className="text-light" target="_blank" rel="noopener noreferrer" href={`${process.env.REACT_APP_BASE_URL}images/${transaction.attachment}`}>
                          {transaction.attachment}
                        </a>
                      </td>
                      <td>{`${diffDate && diffDate > 0 && transaction.user.subscribe ? diffDate : 0} Day(s) remaining`}</td>
                      <td className={transaction.user.subscribe ? 'text-success' : 'text-warning'}>{transaction.user.subscribe ? 'Active' : 'Inactive'}</td>
                      <td className={transaction.status === 'approved' ? 'text-success' : transaction.status === 'cancel' ? 'text-danger' : 'text-warning'}>{S(transaction.status).capitalize().s}</td>
                      {role === 'admin' ? (
                        <td>
                          <DropdownButton className="dropdown-action" size="sm" id="action-button" title="Action">
                            <Dropdown.Item onClick={this.handleOnClick} data-transaction={transaction.id} data-status={'approved'}>
                              Approved
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.handleOnClick} data-transaction={transaction.id} data-status={'cancel'}>
                              Cancel
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      ) : (
                        false
                      )}
                    </tr>
                  );
                })
              : false}
          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    transactions: state.transactionReducer.transactions,
    loading: state.transactionReducer.loading,
    error: state.transactionReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: () => dispatch(getTransactions('?order=id:desc')),
    updateTransaction: (body, idTransaction) => dispatch(updateTransaction(body, idTransaction)),
  };
};

// Dynamic Page with withRouter
export default connect(mapStateToProps, mapDispatchToProps)(TableTransaction);
