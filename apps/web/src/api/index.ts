import axios from 'axios';

export const AxiosHandler = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080/',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
