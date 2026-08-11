import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecobazar_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// Dummy API support
const DUMMY_LATENCY = 300;

export const resolveAfter = (data, ms = DUMMY_LATENCY) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });

export default api;
