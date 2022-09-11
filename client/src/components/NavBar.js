import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from "../assets/logo_no_background.svg";

const menuItem = "text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium";

const NavBar = () => {
  return (
    <header className='bg-gray-800'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className=''>
            <Link to='/'>
              <Logo className='h-full w-12 text-white'/>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className='flex space-x-4'>
              <Link to="/offers" className={menuItem}>Oferty</Link>
              <Link to="/users" className={menuItem}>Użytkownicy</Link>
              <Link to="/logout" className={menuItem}>Wyloguj</Link>
            </div>
          </div>

        </div>
      </div>
      
    </header>
  )
}

export default NavBar