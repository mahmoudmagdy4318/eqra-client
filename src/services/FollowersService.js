import axiosInstance from "../API/axiosInstance";

export default {
    getFollowersData: async() => {
        return await axiosInstance.get("/api/followers");
    },
}