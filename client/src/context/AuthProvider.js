import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../utils/auth.sevice';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate()

  useEffect(()=> {
    if (authService.checkIsAuth() === true && !auth?.accessToken) {
      navigate('/Login')
    }
  })

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;