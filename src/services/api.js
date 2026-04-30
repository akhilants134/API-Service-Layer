// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor: attach token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Optionally, trigger a global logout or warning
        console.warn("Global 401 handler triggered");
      } else if (error.response.status === 403) {
        console.warn("Global 403 handler triggered");
      } else if (error.response.status >= 500) {
        console.error("Server error:", error.response.status);
      }
    }
    return Promise.reject(error);
  },
);

// API functions
export const getProducts = () => api.get("/products");
export const getCategories = () => api.get("/products/categories");
export const getProductById = (id) => api.get(`/products/${id}`);
export const getProductsByCategory = (category) =>
  api.get(`/products/category/${category}`);
export const addToCart = (cartData) => api.post("/carts", cartData);
export const getCart = (userId) => api.get(`/carts/user/${userId}`);
export const deleteCart = (cartId) => api.delete(`/carts/${cartId}`);
export const getUser = (userId) => api.get(`/users/${userId}`);
export const updateUser = (userId, data) => api.put(`/users/${userId}`, data);
export const submitReview = (reviewData) => api.post("/users", reviewData); // Placeholder, adjust as needed

export default api;
