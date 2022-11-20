import http from "../http-common";
import axios from "axios";

class AuthDataService {
  login(email, password) {
    return axios
      .post(http + "/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    return http.post("/auth/logout");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthDataService();
