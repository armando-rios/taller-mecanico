// frontend/src/config/axios.js
import axios from 'axios';


const baseURL = 'http://localhost:5000/api';

const axiosClient = axios.create({
    baseURL,
});

axiosClient.interceptors.request.use((config) => {
    const auth = localStorage.getItem('auth');
    if (auth) {
        const { token } = JSON.parse(auth);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
