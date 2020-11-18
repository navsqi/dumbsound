import { GET_ARTIST, CREATE_ARTIST } from '../constant/artist.constant';
import { API, setAuthToken } from '../../utils/baseAxios';
import { sendError } from '../../utils/errorAsync';

import Cookies from 'js-cookie';

export const getArtists = (queryString = '') => {
  return {
    type: GET_ARTIST,
    payload: async () => {
      try {
        const response = await API.get(`/artists${queryString}`);

        if (response.data.status === 'success') {
          return response.data.data.artists;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};

export const createArtist = (body) => {
  return {
    type: CREATE_ARTIST,
    payload: async () => {
      try {
        setAuthToken(Cookies.get('jwt'));
        const response = await API.post('/artists/', body);

        if (response.data.status === 'success') {
          return response.data.data.artist;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};
