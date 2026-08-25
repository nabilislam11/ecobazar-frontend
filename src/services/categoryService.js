import api from "./api";

export const getCategories = async () => {
  const response = await api.get("/auth/allcategory");

  return response.data;
};
