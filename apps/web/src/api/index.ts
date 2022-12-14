import axios from 'axios';

const baseURL = 'https://resume-dragger-production.up.railway.app';
// const baseURL = undefined;

export const AxiosHandler = axios.create({
    baseURL: baseURL || 'http://localhost:8080',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': baseURL || 'http://localhost:8080',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const ApiHandler = (token: string) =>
    axios.create({
        baseURL: baseURL || 'http://localhost:8080',
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': baseURL || 'http://localhost:8080',
            Authorization: `Bearer ${token}`,
        },
    });
