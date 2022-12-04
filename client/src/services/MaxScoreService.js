import http from "../http-common";

class MaxScoreDataService {
  getAll() {
    return http.get("/maxScore", localStorage.getItem("token"));
  }

  get(id) {
    return http.get(`/maxScore/${id}`, localStorage.getItem("token"));
  }

  create(data) {
    return http.post("/maxScore", data);
  }

  update(id, data) {
    return http.put(`/maxScore/${id}`, data);
  }

  delete(id) {
    return http.delete(`/maxScore/${id}`);
  }
}

export default new MaxScoreDataService();
