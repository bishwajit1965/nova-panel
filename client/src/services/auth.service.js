import api from "./api";

// LOGIN
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// REGISTER
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// LOGOUT
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
