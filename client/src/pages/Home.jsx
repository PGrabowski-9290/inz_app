import React, { useEffect, useState } from 'react'
import ContactForm from '../components/ContactForm'
import HomeOffertsSlider from '../components/offerts/HomeOffertsSlider'
import MainSearch from '../components/search/MainSearch'
import axiosPublic from '../utils/publicApi'

const Home = () => {
  const [filters, setFilters] = useState()
  const [list, setList] = useState([])


  function handleSearch() {
    try {
      console.log("SEARCH IT")
      
    } catch (error) {
      console.error(error)
    }
  }

  async function handleFormSubmit(data) {
    console.log(data)
  }

  async function loadListDataAsync () {
    try {
      const result = await axiosPublic.post('/offerts/public?limit=6')
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
      <div>
        <ContactForm editTitle={true} onSubmit={handleFormSubmit}/>
      </div>
    </div>
  )
}

export default Home