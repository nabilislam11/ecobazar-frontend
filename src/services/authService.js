import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/registration", userData);

  return response.data;
};
