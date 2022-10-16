import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050';

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios;