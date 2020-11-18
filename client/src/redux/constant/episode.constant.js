import { ActionType } from 'redux-promise-middleware';

export const GET_EPISODE = 'GET_EPISODE';
export const CREATE_EPISODE = 'CREATE_EPISODE';
export const UPDATE_FILM = 'UPDATE_FILM';
export const DELETE_FILM = 'DELETE_FILM';

export const GET_EPISODE_PENDING = `${GET_EPISODE}_${ActionType.Pending}`;
export const GET_EPISODE_FULFILLED = `${GET_EPISODE}_${ActionType.Fulfilled}`;
export const GET_EPISODE_REJECTED = `${GET_EPISODE}_${ActionType.Rejected}`;

export const CREATE_EPISODE_PENDING = `${CREATE_EPISODE}_${ActionType.Pending}`;
export const CREATE_EPISODE_FULFILLED = `${CREATE_EPISODE}_${ActionType.Fulfilled}`;
export const CREATE_EPISODE_REJECTED = `${CREATE_EPISODE}_${ActionType.Rejected}`;
