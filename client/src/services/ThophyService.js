import http from "../http-common";

class TrophyDataService {
  getAll() {
    return http.get("/trophy");
  }

  get(id) {
    return http.get(`/trophy/${id}`);
  }

  create(data) {
    return http.post("/trophy", data);
  }

  update(id, data) {
    return http.put(`/trophy/${id}`, data);
  }

  delete(id) {
    return http.delete(`/trophy/${id}`);
  }
}

export default new TrophyDataService();
