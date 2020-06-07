import axios from "axios";
import _ from "lodash";

const axiosInstance = axios.create({
  baseURL: "/",
});
axiosInstance.interceptors.request.use(
  cfg => {
    cfg.headers['Content-Type'] = 'application/json';
    cfg.headers['Authorization'] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGNmZGYwODdlMTkxYWY4ZDZhOWYwMDNjMDEyZWZiZWU1YzJhNjRmY2Q1MzJiOGNjN2E3YjQyZmE5Y2M2OGY1OGRjZWMyOTE0NDhjNDJkYTkiLCJpYXQiOjE1OTE0ODY1OTMsIm5iZiI6MTU5MTQ4NjU5MywiZXhwIjoxNjIzMDIyNTg5LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.qX2zIaVYsuB9HSjvWcQjVG1sYurUbwTzvgecjdFO1d2HZs2DpB-qLb5B-oxeHbfUkpnKI3SR9zc_zzIlMv7koKQGx4jqPhYq8BgsWT77VSZFqdfD0BMcb3PCwSU6lctok4SuIU818La0b8axtalDSy5zUk_qyFtLfR-adcABxNejXMpHGq0ncEWuooXY9rmVXMhUFSpoEd8oSgZu_uf6gKiHDCAw16shAvQkMW-KZJzA44ArMKGXHiBrKgZ72b2vpUdZPsq69WuVUe2c9bFMYqbPHzQI9fhmGfl_BXZeVULK_S-A2XfqrIVn4V68rw1QxDjFE6JtGnh36h6-Ai3iuS-D7AMkJfEtilGC07AbCuVg0OKF8Iih0-dZGwlZJkrXg3tqBVkvpj0cHJOB8DQn9SoC3y-NMF1kDzTefzWNRGfiDAOAj1LgdHDGmAO2tpH9UoVW6wWxFi8NNOvxjphk6ROpsPtrxL0b0jC-UECvgwDwpYzCZHkWSdQtuGpmqUnEdUbxDoAxyfBuo6A8SEOjQsVgzZQ5VA04BIm-g6i403aq0MgsD2wWaD2Jp56HRCdCHfJMXmTOvxLVbwvEI2UjAWzAPIfQqGrCR1fzUJBnqIlrLFGPw156pOWx1Qj8jSdm57X2SQBdF6N1uasd_co37FttdPovDtZN0BqiECT-wWo"
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
