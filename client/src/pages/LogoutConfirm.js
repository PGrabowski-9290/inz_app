import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LogoutConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  
  const handleBack = () => {
    navigate(location.state?.locationTo, {replace: true});
  };

  const handleLogout = () => {
    // todo tu się zadzieje magia wylogowania
    navigate('/Logout', {state: { logoutSucces: true }});
  };

  return (
    <>
      <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
        <div div className="bg-white shadow-lg rounded xl:w-2/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
          <p className="focus:outline-none text-2xl text-center font-extrabold leading-6 text-gray-800 ">
            Czy napewno chcesz się wylogować?
          </p>
          <div className='px-6 flex flex-wrap items-center justify-evenly'>
            <button onClick={handleBack} className='mx-2 my-2 text-sm font-semibold leading-none text-gray-300 focus:outline-none bg-gray-600 border rounded-md hover:bg-gray-700 hover:text-white py-3 w-1/3 '>Anuluj</button>
            <button onClick={handleLogout} className='mx-2 my-2 text-sm font-semibold leading-none text-gray-300 focus:outline-none bg-gray-600 border rounded-md hover:bg-gray-700 hover:text-white py-3 w-1/3'>Wyloguj</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogoutConfirm