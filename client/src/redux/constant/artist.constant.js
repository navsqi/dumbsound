import { ActionType } from 'redux-promise-middleware';

export const GET_ARTIST = 'GET_ARTIST';
export const CREATE_ARTIST = 'CREATE_ARTIST';

export const GET_ARTIST_PENDING = `${GET_ARTIST}_${ActionType.Pending}`;
export const GET_ARTIST_FULFILLED = `${GET_ARTIST}_${ActionType.Fulfilled}`;
export const GET_ARTIST_REJECTED = `${GET_ARTIST}_${ActionType.Rejected}`;

export const CREATE_ARTIST_PENDING = `${CREATE_ARTIST}_${ActionType.Pending}`;
export const CREATE_ARTIST_FULFILLED = `${CREATE_ARTIST}_${ActionType.Fulfilled}`;
export const CREATE_ARTIST_REJECTED = `${CREATE_ARTIST}_${ActionType.Rejected}`;
