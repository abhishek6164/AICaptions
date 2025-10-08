import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE0API_URL,
  withCredentials: true,
});

export default api;