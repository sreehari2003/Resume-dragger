import axios from 'axios';

const baseURL = 'https://resume-dragger-production.up.railway.app';

export const AxiosHandler = axios.create({
    baseURL: baseURL || 'http://localhost:8080',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': baseURL || 'http://localhost:8080/',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
