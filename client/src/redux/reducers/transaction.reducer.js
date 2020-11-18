import {
  GET_TRANSACTION_PENDING,
  GET_TRANSACTION_FULFILLED,
  GET_TRANSACTION_REJECTED,
  CREATE_TRANSACTION_PENDING,
  CREATE_TRANSACTION_REJECTED,
  CREATE_TRANSACTION_FULFILLED,
  UPDATE_TRANSACTION_PENDING,
  UPDATE_TRANSACTION_REJECTED,
  UPDATE_TRANSACTION_FULFILLED,
} from '../constant/transaction.constant';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_TRANSACTION_FULFILLED:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
        error: null,
      };
    case GET_TRANSACTION_REJECTED:
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    case CREATE_TRANSACTION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TRANSACTION_FULFILLED:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
        error: null,
      };
    case CREATE_TRANSACTION_REJECTED:
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    case UPDATE_TRANSACTION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TRANSACTION_FULFILLED:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_TRANSACTION_REJECTED:
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
