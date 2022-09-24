import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if ( timer === 0 ) {
        navigate('/')
      }
      setTimer(timer -1)},1000)
  })

  return (
    <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
      <div div className="bg-white shadow-lg rounded xl:w-2/3 lg:w-5/12 md:w-1/2 w-6/7 lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
        <p className='text-2xl font-bold leading-6 text-gray-800 w-full mb-2 text-center sm:text-left'>Wylogowano</p>
        <div className="w-full flex items-center justify-between py-5">
          <hr className="w-full bg-gray-400" />
          <p className="text-base font-medium leading-4 px-2.5 text-gray-500 text-center">Przekierowanie za</p>
          <hr className="w-full bg-gray-400" />
        </div>
        <div className='py-2 flex justify-center items-center'>
          <span className='block text-5xl'>{timer}</span>
        </div>
        <div className='text-base sm:text-sm text-center sm:text-right'>
          <Link to={"/Login"} className="underline decoration-solid hover:text-blue-500 py-3 px-2">Zaloguj ponownie</Link>
        </div>
      </div>
    </div>
  )
}

export default Logout