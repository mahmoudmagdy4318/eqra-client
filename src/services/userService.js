import http from './httpService'
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/api/auth/signup";

export function register(user){
    return http.post(apiEndPoint,user);
}