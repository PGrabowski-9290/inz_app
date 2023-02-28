import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from "../assets/logo_no_background.svg";
import { roles } from "../enums";
import useAuth from "../hooks/useAuth";
import ProtectedRoleComponent from "./ProtectedRoleComponent";

const NavBar = () => {
  const {auth} = useAuth()
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className='bg-slate-700 fixed top-0 w-full z-20'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center sm:items-center sm:justify-between'>
            <div className='flex flex-shrink-0 items-center'>
              <Link to={"/"} >
                <Logo className='block h-10 w-10 text-white' />
              </Link>
              
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              {/* Menu desktop */}
              <Link to={auth?.accessToken ? "/a/offerts" : "/offerts"} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Oferty</Link>

              <ProtectedRoleComponent allowed={[roles.Admin, roles.User]} component={
                <>
                  <Link to="/a/offerts/new" state={{ locationTo: location.pathname }} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Nowa Oferta</Link>
                </>
              } />

              <Link to={auth?.role === roles.Admin ? "/a/salons" : "/salons"} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Salony</Link>
              { auth?.accessToken && 
                <>
                  { (auth?.role === roles.Admin || auth?.role === roles.User) &&<Link to="/a/settings/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Ustawienia</Link>}
                  <Link to="/logoutconfirm" state={{ locationTo: location.pathname }} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Wyloguj</Link> 
                </>
              }
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center sm:hidden'>
            {/* Mobile menu button */}
            <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset" onClick={() => setOpen(!open)}>
              { open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className='block h-6 w-6' />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      { open && 
        <div className='sm:hidden'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            <Link onClick={() => setOpen(false)} to={auth?.accessToken ? "/a/offerts" : "/offerts"} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Oferty</Link>

            <ProtectedRoleComponent allowed={[roles.Admin, roles.User]} component={
                <>
                  <Link to="/a/offerts/new" onClick={() => setOpen(false)} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Nowa Oferta</Link>
                </>
              } />

            <Link onClick={() => setOpen(false)} to={auth?.role === roles.Admin ? "/a/salons" : "/salons"} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Salony</Link>
            { auth?.accessToken && 
              <>
                { (auth?.role === roles.Admin || auth?.role === roles.User) && <Link onClick={() => setOpen(false)} to="/a/settings/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Ustawienia</Link> }
                <Link onClick={() => setOpen(false)} to="/logoutconfirm" state={{ locationTo: location.pathname }} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Wyloguj</Link>
              </> 
            }
          </div>
        </div>
      }
      
    </nav>
  )
}

export default NavBar