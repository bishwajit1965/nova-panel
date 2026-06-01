import api from "./api";

// LOGIN
export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

// GET ME
export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// REGISTER
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// REFRESH
export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};

// LOGOUT
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
