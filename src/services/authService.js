import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndPoint =apiUrl+"/api/auth";
const tokenKey = "Authorization";


http.setJwt(getJwt());

export async function login(email, password) {
  const {data} = await http.post(apiEndPoint+'/login', {
    email,
    password,
  });
  localStorage.setItem(tokenKey,"Bearer " +data.access_token); 
}


export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
  await http.get(apiEndPoint+'/logout');
}

export async function getCurrentUser() {
    try {
      return await http.get(apiEndPoint+'/user');
    } catch (error) {
      return error;
    }
}


export function getJwt() {
  return localStorage.getItem(tokenKey);
}



export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};
