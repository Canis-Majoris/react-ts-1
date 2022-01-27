// request.js
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getUserTokenData } from '@Utils/request';

const request: AxiosInstance = axios.create({ baseURL: '/' });

interface RequestConfigParams extends AxiosRequestConfig {
  noToken?: boolean;
  customToken?: string;
}

// Request interceptor for API calls
request.interceptors.request.use(
  async (config: RequestConfigParams) => {
    if (!config.headers) {
      config.headers = {
        'Content-Type': 'application/json',
      };
    }

    if (!config.data?.noToken || config.data?.customToken) {
      const { token }: { token: string } = getUserTokenData();
      config.headers.Authorization = `Bearer ${
        config.data?.customToken || token
      }`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
request.interceptors.response.use(
  (response) => response,
  async function (error) {
    return Promise.reject(error);
  }
);

export default request;
