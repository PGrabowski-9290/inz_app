import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
const Layout = () => {
  return (
    <div className='w-full'>
      <NavBar />
      <section className="relative top-16 px-2 pt-5 sm:px-6 lg:px-8">
        <Outlet />
      </section>
    </div>
  )
}

export default Layout