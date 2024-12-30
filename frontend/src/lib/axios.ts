import axios from "axios";

const envURL  = import.meta.env.DEV ? 'http://localhost:3000/api' : '/api'

const authAxios = axios.create({
  baseURL: envURL,
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

authAxios.interceptors.response.use(
  (response) => response, // Pass through if successful
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Attempt to refresh the access token
        const refreshResponse = await axios.get(`${envURL}/auth/refresh`, { withCredentials: true });
        const newToken = refreshResponse.data.token;

        // Update the token in localStorage
        localStorage.setItem("token", newToken);

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        // Handle failed token refresh (e.g., logout user)
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("token"); // Clear token
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
)

authAxios.defaults.withCredentials = true;

export default authAxios