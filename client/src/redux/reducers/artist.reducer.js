import {
  GET_ARTIST_PENDING,
  GET_ARTIST_FULFILLED,
  GET_ARTIST_REJECTED,
  CREATE_ARTIST_PENDING,
  CREATE_ARTIST_FULFILLED,
  CREATE_ARTIST_REJECTED,
} from '../constant/artist.constant';

const initialState = {
  artists: [],
  loading: false,
  error: null,
};

export const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTIST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_ARTIST_FULFILLED:
      return {
        ...state,
        loading: false,
        artists: action.payload,
        error: null,
      };
    case GET_ARTIST_REJECTED:
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    case CREATE_ARTIST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ARTIST_FULFILLED:
      return {
        ...state,
        loading: false,
        artists: action.payload,
        error: null,
      };
    case CREATE_ARTIST_REJECTED:
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
