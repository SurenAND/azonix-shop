import { BASE_URL } from '@/src/constant/url';
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const req = axios.create({ baseURL: BASE_URL });

req.interceptors.request.use(
  (config) => {
    if (config.url !== '/auth/token') {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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
    if (
      error.response.status === 401 &&
      config.url !== '/auth/login' &&
      config.url !== '/auth/token'
    ) {
      try {
        const refreshToken = getCookie('refreshToken');
        const response = await req.post('/auth/token', { refreshToken });
        const accessToken = response?.data?.token?.accessToken;

        if (accessToken) {
          setCookie('accessToken', accessToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
          return req(config);
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (refreshError) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        location.href = '/register';
        return Promise.reject(refreshError);
      }
    } else if (config.url === '/auth/token') {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      location.href = '/register';
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);
