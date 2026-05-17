import axios from "axios";

console.log("ENV:", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// ✅ ADD THIS PART (VERY IMPORTANT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;