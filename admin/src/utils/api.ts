import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: '/api', // 利用 vite proxy 转发到 http://localhost:3000
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    message.error(error.response?.data?.message || '网络请求失败');
    return Promise.reject(error);
  }
);

export default api;
