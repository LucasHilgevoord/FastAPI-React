import axios from 'axios'; // API Connection lib
const api = axios.create( {
    baseURL: 'http://localhost:8000'
})

export default api;