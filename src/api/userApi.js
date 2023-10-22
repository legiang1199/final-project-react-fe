import axiosClient from './axiosSetup/axiosClient';

const UserApi = {
  getAllUsers: () => {
    const url = '/users/';
    return axiosClient.get(url);
  },

  getUserById: (userId) => {
    const url = `/users/${userId}`;
    return axiosClient.get(url);
  },

  patchEditUser: (userId, data) => {
    const url = `/users/${userId}`;
    return axiosClient.patch(url, data);
  },

  deleteUser: (userId) => {
    const url = `/users/${userId}`;
    return axiosClient.delete(url);
  },

  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },

  register: (data) => {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },

  logout: () => {
    const url = '/auth/logout';
    return axiosClient.post(url);
  },
};

export default UserApi;
