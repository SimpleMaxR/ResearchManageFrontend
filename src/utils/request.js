import axios from 'axios'
import { useMainStore } from '../store/index'


const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器
// request.interceptors.request.use(
//     config => {
//         const store = useMainStore()
//         if (store.token == null) {
//             return config
//         }
//         const token = store.token
//         const token_str = token.replace(/^"|"/g, '');
//         if (token) {
//             config.headers.token = token_str
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

request.interceptors.response.use(
    response => {
        let res = response.data
        return res
    },
    error => {
        console.log('Error message:', error.message)
        console.log('Error config:', error.config)
        if (error.response) {
            console.log('Error status:', error.response.status)
            console.log('Error data:', error.response.data)
        }
        return Promise.reject(error)
    }
)


export default request