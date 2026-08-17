import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/registration", userData);

  return response.data;
};
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
export const updateProfile = async (id, data) => {
  const response = await api.put(`/auth/updateuser/${id} `, data);
  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgotpassword", {
    email,
  });
  return response.data;
};
export const resetPassword = async (token, data) => {
  const response = await api.post(`/auth/resetpassword/${token}`, data);

  return response.data;
};
export const getAllUsers = async (id) => {
  const response = await api.get("/auth/alluser");
  return response.data;
};
export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/deletuser/${id}`);
  return response.data;
};
