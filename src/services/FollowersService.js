import axiosInstance from "../API/axiosInstance";

export default {
    searchForUser: async(query, token) => {
        return await axiosInstance.get("/api/followersids");
    },
}