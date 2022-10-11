import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const ProtectedRoute = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return ( 
    auth?.role
      ? <Outlet /> 
      : <Navigate to={"/login"} state={{ locationTo: location.pathname }} replace />
  )
}

export default ProtectedRoute