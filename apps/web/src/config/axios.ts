import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    config.headers.Authorization = `Bearer ${JSON.parse(auth).token}`;
  }
  return config;
});

export default api;
