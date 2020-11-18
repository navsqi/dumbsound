import { ActionType } from 'redux-promise-middleware';

export const GET_MUSIC = 'GET_MUSIC';
export const CREATE_MUSIC = 'CREATE_MUSIC';
export const UPDATE_MUSIC = 'UPDATE_MUSIC';
export const DELETE_MUSIC = 'DELETE_MUSIC';

export const GET_MUSIC_PENDING = `${GET_MUSIC}_${ActionType.Pending}`;
export const GET_MUSIC_FULFILLED = `${GET_MUSIC}_${ActionType.Fulfilled}`;
export const GET_MUSIC_REJECTED = `${GET_MUSIC}_${ActionType.Rejected}`;

export const CREATE_MUSIC_PENDING = `${CREATE_MUSIC}_${ActionType.Pending}`;
export const CREATE_MUSIC_FULFILLED = `${CREATE_MUSIC}_${ActionType.Fulfilled}`;
export const CREATE_MUSIC_REJECTED = `${CREATE_MUSIC}_${ActionType.Rejected}`;
