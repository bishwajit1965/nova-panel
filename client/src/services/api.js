import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Only handle FormData properly
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Let browser set boundary automatically
    delete config.headers["Content-Type"];
  }

  return config;
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
//   withCredentials: true,
//   timeOut: 15000,
// });

// // -----------------------------
// // REQUEST INTERCEPTOR
// // -----------------------------
// api.interceptors.request.use((config) => {
//   if (config.data instanceof FormData) {
//     delete config.headers["Content-Type"];
//   }

//   return config;
// });

// // -----------------------------
// // RESPONSE INTERCEPTOR (15 min fix)
// // -----------------------------

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/auth/refresh");

//         return api(originalRequest);
//       } catch (err) {
//         // refresh failed → real logout
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;
