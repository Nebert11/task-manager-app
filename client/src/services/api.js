import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  console.log("Token in interceptor:", token); // Add this line
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;