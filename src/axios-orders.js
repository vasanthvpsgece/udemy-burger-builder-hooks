import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger-10cbf-default-rtdb.firebaseio.com/'
})

export default axiosInstance