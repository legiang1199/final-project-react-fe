import axiosClient from './axiosSetup/axiosClient';

const ProductApi = {
    getAllProducts: () => {
    const url = '/product/';
    return axiosClient.get(url);
  },

  getProductById: (userId) => {
    const url = `/product/${userId}`;
    return axiosClient.get(url);
  },

  patchEditProduct: (userId, data) => {
    const url = `/product/${userId}`;
    return axiosClient.patch(url, data);
  },

  deleteProduct: (userId) => {
    const url = `/product/${userId}`;
    return axiosClient.delete(url);
  },

  createProduct: (data) => {
    const url = 'product';
    return axiosClient.post(url, data);
  },

  getProductByUserId: (userId) => {
    const url = `/product/user/${userId}`;
    return axiosClient.get(url);
  }

};

export default ProductApi;
