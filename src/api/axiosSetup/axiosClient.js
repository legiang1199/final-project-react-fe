import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;
