import axios from "axios";

const mockserver = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

mockserver.interceptors.request.use((config) => {
    return config;
})

mockserver.interceptors.response.use((res) => {
    return res.data;
}, () => {
    return Promise.reject(new Error('失败'))
})

export default mockserver;