import axiosClient from './axiosSetup/axiosClient';

const StatsApi = {
    statsProduct: () => {
        const url = '/stats/product';
        return axiosClient.get(url);
    },

    statsAuction: () => {
        const url = '/stats/auction';
        return axiosClient.get(url);
    },

    statsUser: () => {
        const url = '/stats/user';
        return axiosClient.get(url);
    },

    statsAll: () => {
        const url = '/stats/all';
        return axiosClient.get(url);
    },

    statsProductByUser: (userId) => {
        const url = `/stats/product/${userId}`;
        return axiosClient.get(url);
    },

    statsAuctionByUser: (userId) => {
        const url = `/stats/auction/${userId}`;
        return axiosClient.get(url);
    },
};

export default StatsApi;