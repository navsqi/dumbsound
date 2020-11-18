import {
  GET_EPISODE_PENDING,
  GET_EPISODE_FULFILLED,
  GET_EPISODE_REJECTED,
  CREATE_EPISODE_PENDING,
  CREATE_EPISODE_REJECTED,
  CREATE_EPISODE_FULFILLED,
} from '../constant/episode.constant';

const initialState = {
  films: [],
  loading: false,
  error: null,
};

export const episodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EPISODE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_EPISODE_FULFILLED:
      return {
        ...state,
        loading: false,
        episodes: action.payload,
        error: null,
      };
    case GET_EPISODE_REJECTED:
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    case CREATE_EPISODE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_EPISODE_FULFILLED:
      return {
        ...state,
        loading: false,
        episodes: action.payload,
        error: null,
      };
    case CREATE_EPISODE_REJECTED:
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
