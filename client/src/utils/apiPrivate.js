import axios from 'axios';


const axiosPrivate = (token) => {
  const bearerToken = `Bearer ${token}`;
  const instance = axios.create({
    baseURL: 'http://localhost:5050',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearerToken
    },
    withCredentials: true
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const config = error?.config
      if (error?.response?.status === 401){
        if (!config?._retry){
          config._retry = true
          const prevLocation = encodeURIComponent(document.location.pathname)
          document.location.href = `/refreshToken?redirect=${prevLocation}`
        } else {
          document.location.href = '/login'
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export default axiosPrivate;