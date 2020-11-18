import { GET_EPISODE, CREATE_EPISODE } from '../constant/episode.constant';
import { API, setAuthToken } from '../../utils/baseAxios';
import { sendError } from '../../utils/errorAsync';
import Cookies from 'js-cookie';

export const getEpisodes = (queryString = '') => {
  return {
    type: GET_EPISODE,
    payload: async () => {
      try {
        const response = await API.get(`/episodes${queryString}`);

        if (response.data.status === 'success') {
          return response.data.data.episodes;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};

export const createEpisode = (body) => {
  return {
    type: CREATE_EPISODE,
    payload: async () => {
      try {
        setAuthToken(Cookies.get('jwt'));
        const response = await API.post('/episodes/', body);

        if (response.data.status === 'success') {
          return response.data.data.episode;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};
