import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:5050',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosPublic;