import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
const Layout = () => {
  return (
    <>
      <NavBar />
      <section className="mx-auto max-w-7xl px-2 pt-5 sm:px-6 lg:px-8">
        <Outlet />
      </section>
    </>
  )
}

export default Layout