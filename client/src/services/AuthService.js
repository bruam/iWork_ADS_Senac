import http from "../http-common";

class AuthDataService {
  login(data) {
    return http.post("/auth/login", data);
  }

  logout() {
    return http.post("/auth/logout");
  }
}

export default new AuthDataService();
