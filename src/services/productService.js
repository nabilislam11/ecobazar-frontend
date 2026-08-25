import api from "./api";
export const createProduct = async (data) => {
  const response = await api.post("/auth/createproduct", data);
  return response.data;
};
