import axios from 'axios';
// import store from '../store/store';
// import { logout } from '../featuers/login-slice/loginSlice';

const apiService = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use((config) => {
  const token = new Cookies().get("Bearer");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// apiService.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       localStorage.setItem('sessionExpired', '1');
//       store.dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

export default apiService;