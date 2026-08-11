import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/registration", userData);

  return response.data;
};
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
