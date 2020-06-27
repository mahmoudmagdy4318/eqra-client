import axiosInstance from "../API/axiosInstance";

export default {
    getFollowersData: async () => {
        return await axiosInstance.get("/api/followers");
    },
    setUserFollowersAsSeen: async () => {
        return await axiosInstance.get("/api/setUserFollowersSeen");
    }
}