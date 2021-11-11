import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosAdmin.interceptors.response.use(
  (res) => {
    if (res.data && res) {
      return res.data;
    }
    return res;
  },
  (error) => {
    console.log(error.response.data);
    return Promise.reject(error.response ? error.response.data.messages : {});
  },
);

export default axiosAdmin;
