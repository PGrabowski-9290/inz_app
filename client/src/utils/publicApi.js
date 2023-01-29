import axios from 'axios';
import config from '../config.json';

const axiosPublic = axios.create({
  baseURL: config.SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosPublic;