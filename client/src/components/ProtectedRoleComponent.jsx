import React from 'react'
import useAuth from '../hooks/useAuth'

const ProtectedRoleComponent = ({allowed, component}) => {
  const { auth } = useAuth()
  console.log(allowed?.includes(auth.role))
  return (
    allowed?.includes(auth.role) ? component : ""
  )
}

export default ProtectedRoleComponent