import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let refreshQueue = [];

// Only handle FormData properly
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 🔒 If refresh already running → queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      await refreshApi.post("/auth/refresh");

      refreshQueue.forEach((p) => p.resolve());
      refreshQueue = [];

      return api(originalRequest);
    } catch (err) {
      refreshQueue.forEach((p) => p.reject(err));
      refreshQueue = [];

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
