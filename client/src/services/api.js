import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  timeOut: 15000,
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  refreshQueue = [];
};

// -----------------------------
// REQUEST INTERCEPTOR
// -----------------------------
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// -----------------------------
// RESPONSE INTERCEPTOR (15 min fix)
// -----------------------------

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // prevent infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If refresh already running → queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve,
          reject,
        });
      })
        .then(() => api(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      await api.post("/auth/refresh");

      processQueue(null);

      return api(originalRequest);
    } catch (err) {
      processQueue(err);

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;

// import axios from "axios";
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
//   withCredentials: true, // ✅ Allows cookies & authentication tokens
// });

// // Add a request interceptor to set Content-type dynamically
// api.interceptors.request.use(
//   (config) => {
//     if (!config.headers["Content-Type"]) {
//       // set Content-type to JSON if not already specified
//       if (config.data instanceof FormData) {
//         delete config.headers["Content-Type"];
//       } else {
//         config.headers["Content-Type"] = "application/json";
//       }
//     }
//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   },
// );
// export default api;

// import axios from "axios";
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

// // Only handle FormData properly
// api.interceptors.request.use((config) => {
//   if (config.data instanceof FormData) {
//     // Let browser set boundary automatically
//     delete config.headers["Content-Type"];
//   }

//   return config;
// });

// export default api;
