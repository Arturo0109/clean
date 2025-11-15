import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL|| 'http://localhost:3000';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true,
});

api.interceptors.request.use((config) =>{
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (token && config.headers){
            config.headers.Authorization = `Bearer ${token}`;
        }

    } catch (e) {
        
    }
    return config;
});

export default api;