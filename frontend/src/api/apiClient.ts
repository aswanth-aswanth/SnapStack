// apiClient.js
import axios from "axios";
import requestInterceptor from "./interceptors/requestInterceptor";
console.log("env : ", import.meta.env.VITE_PUBLIC_BASE_URL);
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(requestInterceptor);

export default apiClient;
