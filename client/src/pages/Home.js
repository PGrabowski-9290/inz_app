import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MainSearch from '../components/MainSearch'

const Home = () => {
  const [filters, setFilters] = useState()
  const navigate = useNavigate()
  useEffect(()=> {

  },[filters])


  return (
    <>    
      <div>
        <MainSearch setFilters={setFilters}/>
      </div>
    </>
  )
}

export default Home