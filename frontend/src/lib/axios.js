import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"/api",
    withCredentials: true, // This allows cookies to be sent with requests

});

export default axiosInstance;