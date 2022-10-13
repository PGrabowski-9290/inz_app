import { createContext, useEffect, useState } from 'react';
import axios from '../utils/API';
import authService from '../utils/auth.sevice';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const handleAuth = async () => {
    try{  
      const response = await axios.get("/auth/refresh")
      console.log("res",response)
    }catch (err) {
      console.log(err)
      authService.set(true)
    }
  }

  useEffect(()=> {
    if (authService.check() === true) {
      handleAuth()
    }
  },[])

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;