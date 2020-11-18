import { GET_MUSIC, CREATE_MUSIC } from '../constant/music.constant';
import { API, setAuthToken } from '../../utils/baseAxios';
import { sendError } from '../../utils/errorAsync';
import Cookies from 'js-cookie';

export const getMusics = (queryString = '') => {
  return {
    type: GET_MUSIC,
    payload: async () => {
      try {
        const response = await API.get(`/musics${queryString}`);

        if (response.data.status === 'success') {
          return response.data.data.musics;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};

// export const getArtistAndMusics = (idArtist) => {
//   return {
//     type: GET_MUSIC_EPS,
//     payload: async () => {
//       try {
//         const response = await API.get(`/musics/${idArtist}/episodes`);

//         if (response.data.status === 'success') {
//           return response.data.data.music;
//         }
//       } catch (err) {
//         sendError(err);
//       }
//     },
//   };
// };

export const createMusic = (body) => {
  return {
    type: CREATE_MUSIC,
    payload: async () => {
      try {
        setAuthToken(Cookies.get('jwt'));
        const response = await API.post('/musics/', body);

        if (response.data.status === 'success') {
          return response.data.data.music;
        }
      } catch (err) {
        sendError(err);
      }
    },
  };
};
