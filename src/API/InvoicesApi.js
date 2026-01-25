import apiService from "./apiservice";

export const getInvoicesApi = async () => {
  const response = await apiService.get(`/api/v1/invoices/`);
  return response.data;
};
export const getInvoiceByIdApi = async (id) => {
  const response = await apiService.get(`/api/v1/invoices/${id}`);
  return response.data;
};

export const createInvoiceApi = async (data) => {
  const response = await apiService.post('/api/v1/invoices/', data);
  return response.data;
};

export const updateInvoiceApi = async (id, data) => {
  const response = await apiService.put(`/api/v1/invoices/${id}/`, data);
  return response.data;
};

export const deleteInvoiceApi = async (id) => {
  await apiService.delete(`/api/v1/invoices/${id}`);
};