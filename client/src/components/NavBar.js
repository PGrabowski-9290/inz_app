import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from "../assets/logo_no_background.svg";

const menuItem = "text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium";
const currentMenuItem = "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium";

const classNames = (...names) => {
  return names.filter(Boolean).join(' ');
}

const NavBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-between'>
            <div className='flex flex-shrink-0 items-center'>
              <Logo className='block h-10 w-10 text-white' />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <Link to="/offers" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Oferty</Link>
              <Link to="/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Użytkownicy</Link>
              <Link to="/logout" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Wyloguj</Link>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center sm:hidden'>
            {/* Mobile menu button */}
            <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset" onClick={() => setOpen(!open)}>
              {open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className='block h-6 w-6' />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {open && <div className='sm:hidden'>
        <div className='space-y-1 px-2 pt-2 pb-3'>
          <Link onClick={() => setOpen(false)} to="/offers" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Oferty</Link>
          <Link onClick={() => setOpen(false)} to="/users" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Użytkownicy</Link>
          <Link onClick={() => setOpen(false)} to="/logout" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Wyloguj</Link>
        </div>
      </div>}
      
    </nav>
  )
}

export default NavBar