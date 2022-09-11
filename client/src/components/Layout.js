import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <section className="flex flex-row mx-auto w-5/6">
        <Outlet />
      </section>
    </>
  )
}

export default Layout