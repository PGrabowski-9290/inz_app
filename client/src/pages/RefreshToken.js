import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from '../utils/api'
import authService from '../utils/auth.sevice'
//todo naprawa przekierowania po 401 otrzymanym przez interceptor axios

const RefreshToken = () => {
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const handleAuth = async () => {
    try{  
      const response = await axios.get("/auth/refresh",{headers: { 'Content-Type': 'application/json'},withCredentials: true})
      console.log(searchParams)
      if (response?.status === 200){
        const {role, accessToken} = response?.data
        authService.setIsAuth(true);
        setAuth({accessToken: accessToken, role: role})
        const param = searchParams.get('redirect')
        const locationTo = location.state?.redirectTo || param || '/'
        console.log("Redirect to: ",locationTo)
        navigate(locationTo,{replace: true})
      }
    }catch (err) {
      console.log(err)
      navigate('/Login')
      authService.setIsAuth(false)
    }
  }

  useEffect(()=>{
    handleAuth()
  },[])
  
  return (
    <div className='text-center'>Refreshing Token</div>
  )
}

export default RefreshToken