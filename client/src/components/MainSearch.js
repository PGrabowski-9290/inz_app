import React, { useEffect, useState } from 'react'

const MainSearch = ({ filters, setFilters }) => {
  const [category, setCategory] = useState()
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded w-full px-2 py-6 sm:w-1/3'>
        <p className='focus:outline-none text-xl font-extrabold leading-6 text-gray-800 text-center sm:text-left px-6'>Wyszukaj</p>
        <div>

        </div>
      </div>
    </div>
  )
}

export default MainSearch