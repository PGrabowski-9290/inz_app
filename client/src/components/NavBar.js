import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from "../assets/logo_no_background.svg"
import NavBarMenu from './NavBarMenu'

const NavBar = () => {
  return (
    <header className='flex items-center justify-between text-center font-bold bg-gray-900 text-white px-2 mb-1 h-12'>
      <div className='h-12 w-12'>
        <Link to='/'>
          <Logo className='max-h-full max-w-full text-white'/>
        </Link>
      </div>
      <NavBarMenu />
    </header>
  )
}

export default NavBar