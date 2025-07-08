import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:"/api", // Use relative path for local development
    baseURL:"https://nexoraa-a-social-app.onrender.com",
    withCredentials: true, // This allows cookies to be sent with requests

});

export default axiosInstance;