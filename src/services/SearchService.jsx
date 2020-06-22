const { default: Axios } = require("axios");

export default {
    searchForUser: async(query, token) => {
        return await Axios.get(`api/search/${query}`, {
            cancelToken: token,
        })
    },
    MassiveSearch: async(query, token) => {
        return await Axios.get(`api/massive/search/${query}`, {
            cancelToken: token
        });
    },
    setResultMsgIfMsgEmpty: (searchResult, setErrorMessage) =>{
        const emptyResultMsg = !searchResult.length
        ? "Sorry There is Not User Match this Search Option"
        : "";
        setErrorMessage(emptyResultMsg);
    }
}