import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  maxContentLength: 50 * 1024 * 1024, // 50 MB
});

axiosClient.interceptors.request.use((config) => {
  // You can modify the request config here if needed
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // Process successful responses
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default axiosClient;
