import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // 👈 apna backend port daal
  withCredentials: true,            // cookies ke liye zaroori
});

export default api;
