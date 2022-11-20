import http from "../http-common";

class AuthDataService {
  login() {
    return http.post("/auth/login");
  }

  logout() {
    return http.post("/auth/logout");
  }
}

export default new AuthDataService();
