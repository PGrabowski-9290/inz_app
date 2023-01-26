import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MainSearch from '../components/MainSearch/MainSearch'

const Home = () => {
  const [filters, setFilters] = useState()
  const navigate = useNavigate()

  function handleSearch() {
    try {
      console.log("SEARCH IT")
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col space-y-16'>    
      <div>
        <MainSearch setFilters={setFilters} filters={filters} onSearch={handleSearch}/>
      </div>
      <div>
        <div className='flex items-center justify-center'>
          <div className='bg-white shadow-lg rounded w-full px-2 py-6 sm:w-11/12'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home