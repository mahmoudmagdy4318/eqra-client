class Authentication {
  constructor() {
    this.authenticated = false;
  }

  login(props,token) {
    sessionStorage.setItem("token", token);
    props.history.push("/");
    this.authenticated = true;
  }

  logout(props) {
    this.authenticated = false;
    sessionStorage.removeItem('token')
    props.history.push("/login");
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Authentication();