
class Authentication {
  constructor() {
    this.authenticated = false;
  }

  login(token) {
    sessionStorage.setItem("token", token);
    this.authenticated = true;
    window.location = '/';
  }

  logout() {
    sessionStorage.removeItem('token');
    this.authenticated = false;
    window.location = '/login';
  }

  isAuthenticated() {
    return true;
  }
}

export default new Authentication();