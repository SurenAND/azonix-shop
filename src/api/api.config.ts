import { MainRoutes } from '@/src/constant/routes';
import { BASE_URL } from '@/src/constant/url';
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const req = axios.create({ baseURL: BASE_URL });

req.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Token ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

req.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const config = error.config;
    if (error.response.status === 401) {
      try {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
          setCookie('accessToken', accessToken);
          config.headers.Authorization = `Token ${accessToken}`;
          return req(config);
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (refreshError) {
        deleteCookie('accessToken');
        location.href = MainRoutes.REGISTER;
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  },
);
