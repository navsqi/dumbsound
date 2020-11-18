import { ActionType } from 'redux-promise-middleware';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export const LOGIN_PENDING = `${LOGIN}_${ActionType.Pending}`;
export const LOGIN_FULFILLED = `${LOGIN}_${ActionType.Fulfilled}`;
export const LOGIN_REJECTED = `${LOGIN}_${ActionType.Rejected}`;

export const REGISTER_PENDING = `${REGISTER}_${ActionType.Pending}`;
export const REGISTER_FULFILLED = `${REGISTER}_${ActionType.Fulfilled}`;
export const REGISTER_REJECTED = `${REGISTER}_${ActionType.Rejected}`;
