import {
  GET_MUSIC_PENDING,
  GET_MUSIC_FULFILLED,
  GET_MUSIC_REJECTED,
  CREATE_MUSIC_PENDING,
  CREATE_MUSIC_REJECTED,
  CREATE_MUSIC_FULFILLED,
} from '../constant/music.constant';

const initialState = {
  musics: [],
  loading: false,
  error: null,
};

export const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MUSIC_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_MUSIC_FULFILLED:
      return {
        ...state,
        loading: false,
        musics: action.payload,
        error: null,
      };
    case GET_MUSIC_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_MUSIC_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MUSIC_FULFILLED:
      return {
        ...state,
        loading: false,
        musics: action.payload,
        error: null,
      };
    case CREATE_MUSIC_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
