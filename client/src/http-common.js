import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getProjects = async () => {
  return api.get("/projects");
};

export const getScores = async () => {
  return api.get("/maxScore");
};

export const getTasks = async () => {
  return api.get("/tasks");
};

export const getTrophies = async () => {
  return api.get("/trophy");
};
