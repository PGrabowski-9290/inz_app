import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import HomeOffertsSlider from '../components/HomeOffertsSlider'
import MainSearch from '../components/search/MainSearch'
import axiosPublic from '../utils/api'

const Home = () => {
  const [filters, setFilters] = useState()
  const [list, setList] = useState([])
  const navigate = useNavigate()

  function handleSearch() {
    try {
      console.log("SEARCH IT")
      
    } catch (error) {
      console.error(error)
    }
  }

  async function loadListDataAsync () {
    try {
      const result = await axiosPublic.get('/offerts/public?limit=6')
      if ( result.status === 200 )
        setList(result.data.data)
    } catch (error) {
      console.error("error on download")
    }
  }

  useEffect(()=> {
    loadListDataAsync()
  },[])
  return (
    <div className='flex flex-col space-y-16'>    
      <div>
        <MainSearch setFilters={setFilters} filters={filters} onSearch={handleSearch}/>
      </div>
      <div>

        <HomeOffertsSlider list={list} />

      </div>
    </div>
  )
}

export default Home