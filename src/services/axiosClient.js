import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://web-tuyen-dung-be.herokuapp.com",
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
