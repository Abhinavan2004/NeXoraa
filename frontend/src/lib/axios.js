import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials: true, // This allows cookies to be sent with requests

});

export default axiosInstance;