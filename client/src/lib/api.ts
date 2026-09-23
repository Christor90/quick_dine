

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Request interceptor to attach JWT token and handle FormData
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // ⭐ CRITICAL: Handle FormData properly
        if (config.data instanceof FormData) {
            // Delete Content-Type so axios sets it to multipart/form-data automatically
            delete config.headers["Content-Type"];
        } else {
            // For regular JSON requests
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;