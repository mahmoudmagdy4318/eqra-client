import axios from "axios";
import _ from "lodash";

const axiosInstance = axios.create({
  baseURL: "/",
});
axiosInstance.interceptors.request.use(
  cfg => {
    cfg.headers['Content-Type'] = 'application/json';
    return cfg;
  }
)

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    if (_.get(error, "response.status") === 401) {
      alert(
        "you are not authorized to do that action please identify your identity!"
      );
      window.location.href = "/login";

      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
