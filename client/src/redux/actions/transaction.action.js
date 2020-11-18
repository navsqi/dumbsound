import {
  GET_TRANSACTION,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from '../constant/transaction.constant';
import { API, setAuthToken } from '../../utils/baseAxios';
import { sendError } from '../../utils/errorAsync';
import Cookies from 'js-cookie';

export const getTransactions = (queryString = '') => {
  return {
    type: GET_TRANSACTION,
    payload: async () => {
      try {
        setAuthToken(Cookies.get('jwt'));
        const response = await API.get(`/transactions${queryString}`);

        if (response.data.status === 'success') {
          return response.data.data.transactions;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};

export const createTransaction = (body) => {
  return {
    type: CREATE_TRANSACTION,
    payload: async () => {
      try {
        setAuthToken(Cookies.get('jwt'));
        const response = await API.post('/transactions/', body);

        if (response.data.status === 'success') {
          return response.data.data.transaction;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};

export const updateTransaction = (body, idTransaction) => {
  // console.log(body, idTransaction);
  return {
    type: UPDATE_TRANSACTION,
    payload: async () => {
      try {
        setAuthToken(Cookies.get('jwt'));
        const response = await API.patch(`/transactions/${idTransaction}`, body);

        if (response.data.status === 'success') {
          return response.data.data.transactions;
        }
      } catch (err) {
        // console.log(err);
        sendError(err);
      }
    },
  };
};
