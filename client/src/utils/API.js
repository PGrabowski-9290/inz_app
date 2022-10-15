import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050';

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios;