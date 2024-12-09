import axios from "axios";

const baseUrl = 'http://localhost:3000/api/v1'

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL=baseUrl;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;