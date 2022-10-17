import axios from 'axios';

const axiosPrivate = (token) => {
  const bearerToken = `Bearer ${token}`;
  return axios.create({
    baseURL: 'http://localhost:5050',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearerToken
    },
    withCredentials: true
  })
}

export default axiosPrivate;