import axiosClient from "./axiosSetup/axiosClient";

const CategoryApi = {
    getAllCategories: () => {
        const url = "/categories/";
        return axiosClient.get(url);
    },
    
    getCategoryById: (categoryId) => {
        const url = `/categories/${categoryId}`;
        return axiosClient.get(url);
    },
    
    createCategory: (data) => {
        const url = "/categories/";
        return axiosClient.post(url, data);
    },
    
    patchEditCategory: (categoryId, data) => {
        const url = `/categories/${categoryId}`;
        return axiosClient.patch(url, data);
    },
    
    deleteCategory: (categoryId) => {
        const url = `/categories/${categoryId}`;
        return axiosClient.delete(url);
    },
    };

export default CategoryApi;