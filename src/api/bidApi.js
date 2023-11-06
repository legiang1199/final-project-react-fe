import axiosClient from "./axiosSetup/axiosClient";

const BidApi = {
    getAllBids: () => {
        const url = "/bid/";
        return axiosClient.get(url);
    },
    
    getBidById: (bidId) => {
        const url = `/bid/${bidId}`;
        return axiosClient.get(url);
    },
    
    createBid: (data) => {
        const url = "/bid/";
        return axiosClient.post(url, data);
    },
    
    patchEditBid: (bidId, data) => {
        const url = `/bid/${bidId}`;
        return axiosClient.patch(url, data);
    },
    
    deleteBid: (bidId) => {
        const url = `/bid/${bidId}`;
        return axiosClient.delete(url);
    },
    getBidByUserId: (userId) => {
        const url = `/bid/user/${userId}`;
        return axiosClient.get(url);
    },
    getBidByAuctionId: (auctionId) => {
        const url = `/bid/auction/${auctionId}`;
        return axiosClient.get(url);
    },
};

export default BidApi;