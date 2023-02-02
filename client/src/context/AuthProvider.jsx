import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../utils/auth.sevice';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    if (authService.checkIsAuth() === true && !auth?.accessToken) {
      navigate('/refreshToken', {state: {redirectTo: location?.pathname },replace: true})
    }
  },[])

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;