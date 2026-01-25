import apiService from "./apiservice";

export const getItemsApi = async (main) => {
  const response = await apiService.get(`/api/v1/${main}/`);
  return response.data;
};
export const getItemByIdApi = async (id) => {
  const response = await apiService.get(`/api/v1/items/${id}`);
  return response.data;
};
export const getItemByCodeApi = async (code) => {
  const response = await apiService.get(`/api/v1/items/code/${code}`);
  return response.data;
};

export const createItemApi = async (data) => {
  const response = await apiService.post('/api/v1/items/', data);
  return response.data;
};

export const updateItemApi = async (id, data) => {
  const response = await apiService.put(`/api/v1/items/${id}/`, data);
  return response.data;
};

export const deleteItemApi = async (id) => {
  await apiService.delete(`/api/v1/items/${id}`);
};