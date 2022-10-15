import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from '../utils/api'
import authService from '../utils/auth.sevice'


const RefreshToken = () => {
  const [setAuth] = useAuth()
  const navigate = useNavigate()
  const handleAuth = async () => {
    try{  
      const response = await axios.get("/auth/refresh")
      
      if (response?.status === 200){
        const {role, accessToken} = response?.data
        authService.setIsAuth(true);
        setAuth({accessToken: accessToken, role: role})
        navigate(-1,{replace: true})
      }
  
    }catch (err) {
      console.log(err)
      navigate('/Login')
      authService.setIsAuth(false)
    }
  }

  useEffect(()=>{
    handleAuth()
  })
  
  return (
    <div className='text-center'>Refreshing Token</div>
  )
}

export default RefreshToken