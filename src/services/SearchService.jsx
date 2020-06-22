const { default: Axios } = require("axios");

export default {
    searchForUser: async(query, token) => {
        return await Axios.get(`api/search/${query}`, {
            cancelToken: token,
        })
    }
}