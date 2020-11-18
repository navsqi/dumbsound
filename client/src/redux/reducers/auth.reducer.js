import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT,
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
} from '../constant/auth.constant';

const initialState = {
  isLogin: false,
  user: {},
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        isLogin: true,
        loading: false,
        user: {
          id: action.payload.id,
          fullName: action.payload.fullName,
          email: action.payload.email,
          gender: action.payload.gender,
          phone: action.payload.phone,
          address: action.payload.address,
          subscribe: action.payload.subscribe,
          role: action.payload.role,
        },
        error: null,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    case REGISTER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        isLogin: true,
        loading: false,
        user: {
          id: action.payload.id,
          fullName: action.payload.fullName,
          email: action.payload.email,
          gender: action.payload.gender,
          phone: action.payload.phone,
          address: action.payload.address,
          subscribe: action.payload.subscribe,
          role: action.payload.role,
        },
        error: null,
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
