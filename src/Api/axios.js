import axios from 'axios'
const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/clone-3bba0/us-central1/api",
    // baseURL:"https://amazon-api-backend-dz21.onrender.com"
    baseURL:"https://amazon-backend-kstr.onrender.com/"
})
export {axiosInstance};