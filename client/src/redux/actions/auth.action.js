import { LOGIN, LOGOUT, REGISTER } from '../constant/auth.constant';
import { API } from '../../utils/baseAxios';
import { sendError } from '../../utils/errorAsync';

import Cookies from 'js-cookie';

export const login = (body) => {
  return {
    type: LOGIN,
    payload: async () => {
      try {
        const response = await API.post('/auth/login', body);

        // set token to cookies
        Cookies.set('jwt', response.data.token, { expires: 7 });

        if (response.data.status === 'success') {
          return response.data.data.user;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};

export const logout = () => {
  Cookies.remove('jwt');

  return {
    type: LOGOUT,
  };
};

export const register = (body) => {
  return {
    type: REGISTER,
    payload: async () => {
      try {
        const response = await API.post('/auth/register', body);

        // set token to cookies
        Cookies.set('jwt', response.data.token, { expires: 7 });

        if (response.data.status === 'success') {
          localStorage.setItem('login', '1');
          localStorage.setItem('user', JSON.stringify(response.data.data.user));

          return response.data.data.user;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};
