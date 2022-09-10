import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
const NavBarMenu = ( authToken ) => {
  const navigation = useNavigate();

  const menuItem = "text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"

  return (
    <div className='flex flex-row space-between'>
      <Link to="/offers" className={menuItem}>Oferty</Link>
      <Link to="/users" className={menuItem}>Użytkownicy</Link>
      <Link to="/logout" className={menuItem}>Wyloguj</Link>
    </div>
  )
}

export default NavBarMenu