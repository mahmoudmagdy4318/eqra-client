import axios from "axios";
import _ from "lodash";

const axiosInstance = axios.create({
  baseURL: "/",
});

axiosInstance.interceptors.request.use((cfg) => {
  cfg.headers["Accept"] = "application/json";
  cfg.headers["Authorization"] = `${localStorage.getItem("Authorization")}`;
  // "Content-Type", "application/x-www-form-urlencoded"
  // cfg.headers["Content-Type"] = "";
  // cfg.headers['content-type']= 'multipart/form-data'

  return cfg;
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    if (_.get(error, "response.status") === 401) {
      localStorage.removeItem("Authorization");
      window.location.href = "/login";
      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
