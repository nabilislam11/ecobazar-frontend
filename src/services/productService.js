import api from "./api";
export const createProduct = async (data) => {
  const response = await api.post("/auth/createproduct", data);
  return response.data;
};
export const getProducts = async (data) => {
  const response = await api.get("/auth/getallproduct", data);
  return response.data;
};
