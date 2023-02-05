import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

request.interceptors.request.use(config => {
    nprogress.start();
    return config;
})

request.interceptors.response.use((res: any) => {
    nprogress.done();
    return res;
}, err => {
    nprogress.done();
    return Promise.reject(err);
})

export default request;