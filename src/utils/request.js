import axios from 'axios'
import { MainStore } from '../store/index'


const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

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