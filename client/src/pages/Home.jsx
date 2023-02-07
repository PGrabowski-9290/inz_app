import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import HomeOffertsSlider from '../components/offerts/HomeOffertsSlider'
import MainSearch from '../components/search/MainSearch'
import useAuth from '../hooks/useAuth'
import axiosPublic from '../utils/publicApi'

const Home = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [filters, setFilters] = useState()
  const [list, setList] = useState([])


  function handleSearch() {
    try {
      const url = auth?.accessToken ? '/a/offerts' : '/offerts' 
      navigate(url, {state: {filters: filters}, replace: true})
      
    } catch (error) {
      console.error(error)
    }
  }

  async function handleContactFormSubmit(data) {
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

  useEffect(() => {
    if (filters !== undefined){
      console.log(filters)
      handleSearch()
    }
  }, [filters])

  useEffect(()=> {
    loadListDataAsync()
  },[])

  return (
    <div className='flex flex-col space-y-16'>    
      <div>
        <MainSearch setFilters={setFilters} />
      </div>
      <div>
        <HomeOffertsSlider list={list} />
      </div>
      <div>
        <ContactForm editTitle={true} onSubmit={handleContactFormSubmit}/>
      </div>
    </div>
  )
}

export default Home