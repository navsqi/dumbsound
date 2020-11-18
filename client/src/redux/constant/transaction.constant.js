import { ActionType } from 'redux-promise-middleware';

export const GET_TRANSACTION = 'GET_TRANSACTION';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

export const GET_TRANSACTION_PENDING = `${GET_TRANSACTION}_${ActionType.Pending}`;
export const GET_TRANSACTION_FULFILLED = `${GET_TRANSACTION}_${ActionType.Fulfilled}`;
export const GET_TRANSACTION_REJECTED = `${GET_TRANSACTION}_${ActionType.Rejected}`;

export const CREATE_TRANSACTION_PENDING = `${CREATE_TRANSACTION}_${ActionType.Pending}`;
export const CREATE_TRANSACTION_FULFILLED = `${CREATE_TRANSACTION}_${ActionType.Fulfilled}`;
export const CREATE_TRANSACTION_REJECTED = `${CREATE_TRANSACTION}_${ActionType.Rejected}`;

export const UPDATE_TRANSACTION_PENDING = `${UPDATE_TRANSACTION}_${ActionType.Pending}`;
export const UPDATE_TRANSACTION_FULFILLED = `${UPDATE_TRANSACTION}_${ActionType.Fulfilled}`;
export const UPDATE_TRANSACTION_REJECTED = `${UPDATE_TRANSACTION}_${ActionType.Rejected}`;
