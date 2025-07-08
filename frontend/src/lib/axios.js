import axios from "axios";

const BASE_URL = import.meta.env.mode === 'development'? "http://localhost:4000/api" : "/api"; // Adjust the base URL based on the environment
const axiosInstance = axios.create({
    // baseURL:"/api",                       // Use relative path for local development
    baseURL: BASE_URL,
    withCredentials: true, // This allows cookies to be sent with requests

});

export default axiosInstance;