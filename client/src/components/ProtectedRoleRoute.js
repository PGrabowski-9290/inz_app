import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const ProtectedRoleRoute = ({allowed, redirect = '/refresh'}) => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    allowed?.includes(auth.role) 
      ? <Outlet /> 
      : <Navigate to={"/unauthorized"} state={{ locationTo: location.pathname }} replace />
  )
}

export default ProtectedRoleRoute