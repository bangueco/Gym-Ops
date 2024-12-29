import axios from "axios";

const envURL  = import.meta.env.DEV ? 'http://localhost:3000/api' : '/api'

const authAxios = axios.create({
  url: '/auth',
  baseURL: envURL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
})

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios