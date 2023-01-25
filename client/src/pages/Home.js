import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MainSearch from '../components/MainSearch/MainSearch'

const Home = () => {
  const [filters, setFilters] = useState()
  const navigate = useNavigate()
  // useEffect(()=> {
  //   console.log(filters)
  // },[filters])


  return (
    <>    
      <div>
        <MainSearch setFilters={setFilters} filters={filters}/>
      </div>
    </>
  )
}

export default Home