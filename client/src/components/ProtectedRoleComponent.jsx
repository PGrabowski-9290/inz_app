import React from 'react'
import useAuth from '../hooks/useAuth'

const ProtectedRoleComponent = ({allowed, component}) => {
  const { auth } = useAuth()
  return (
    allowed?.includes(auth.role) ? component : ""
  )
}

export default ProtectedRoleComponent