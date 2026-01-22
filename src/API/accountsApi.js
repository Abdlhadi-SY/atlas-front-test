import apiService from "./apiservice";

// export const getAttendancesApi = async (filters = {}) => {
//   const params = new URLSearchParams();
//   if (filters.student__section) {
//     params.append('student__section', filters.student__section);
//   }
//   if (filters.date) {
//     params.append('date', filters.date);
//   }
//   if (filters.student) {
//     params.append('student', filters.student);
//   }
//   const queryString = params.toString();
//   const url = queryString ? `/api/school/attendances?${queryString}` : '/api/school/attendances';
//   const response = await apiService.get(url);
//   return response.data;
// };



export const getAccountsApi = async () => {
  const response = await apiService.get(`/api/v1/accounts/`);
  return response.data;
};
export const getAccountByIdApi = async (id) => {
  const response = await apiService.get(`/api/v1/accounts/${id}`);
  return response.data;
};

export const createAccountApi = async (data) => {
  const response = await apiService.post('/api/v1/accounts/', data);
  return response.data;
};

export const updateAccountApi = async (id, data) => {
  const response = await apiService.put(`/api/v1/accounts/${id}/`, data);
  return response.data;
};

export const deleteAccountApi = async (id) => {
  await apiService.delete(`/api/v1/accounts/${id}`);
};