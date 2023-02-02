import { Breadcrumb } from '@vechaiui/react'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Settings = () => {
  const {auth} = useAuth()
  const [currentPage,setCurrentPage] = useState("Profile")
  const location = useLocation()

  useEffect(()=>{
    setCurrentPage(location.pathname.split('/')[2].toLowerCase())
  },[location.pathname])

  return (
    <>
      <div className='flex flex-col w-full pb-4 sm:p-4 space-y-4'>
        <Breadcrumb separator={"-"}>
          <Breadcrumb.Item currentPage={currentPage === 'profile'}>
            <Breadcrumb.Link as={"span"}>
              <Link to={"profile"}>Profil</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          {auth?.role === "admin" && <Breadcrumb.Item currentPage={currentPage === "users"}>
            <Breadcrumb.Link as={"span"}>
              <Link to={"Users"}>Użytkownicy</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>}
        </Breadcrumb>
      </div>
      <Outlet />
    </>
  )
}

export default Settings