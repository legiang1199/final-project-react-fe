import axiosClient from "./axiosSetup/axiosClient";

const AuctionApi = {
    getAllAuctions: () => {
        const url = "/auction/";
        return axiosClient.get(url);
    },
    
    getAuctionById: (auctionId) => {
        const url = `/auction/${auctionId}`;
        return axiosClient.get(url);
    },
    
    createAuction: (data) => {
        const url = "/auction/";
        return axiosClient.post(url, data);
    },
    
    patchEditAuction: (auctionId, data) => {
        const url = `/auction/${auctionId}`;
        return axiosClient.patch(url, data);
    },
    
    deleteAuction: (auctionId) => {
        const url = `/auction/${auctionId}`;
        return axiosClient.delete(url);
    },
    getAuctionByUserId: (userId) => {
        const url = `/auction/user/${userId}`;
        return axiosClient.get(url);
    },
    searchAuction: (search) =>{
        const url =`/search/${search}`;
        return axiosClient.get(url);
    }
    };

export default AuctionApi;