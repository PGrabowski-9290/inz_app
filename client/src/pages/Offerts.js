import { Button } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import OfertsList from '../components/OfertsList.jsx';
import MainSearch from '../components/search/MainSearch.js';
import axiosPublic from "../utils/publicApi";

const Offers = () => {
  const [data, setData] = useState({})
  const [openFilters, setOpenFilters] = useState(false)
  const [filters,setFilters] = useState()
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1) 

  async function loadListAsync() {
    try {
      var url;
      // todo do przemyślnia endpoint
      if ( !filters?.make ) {
        console.log("nomake")
        url = `/offerts/public?limit=${limit}&page=${page}`
      }
      else {
        console.log("ismake")
        url = `/offerts/public/filter?limit=${limit}&page=${page}`
      }

      const result = await axiosPublic.post(url,
      JSON.stringify(filters),
      {
        headers: { 'Content-Type': 'application/json'}
      })

      if( result.status === 200 ) {
        setData(result.data)
      }

    } catch (error) {
      console.error(error)
    }
  }

  function handleSearch () {
    setOpenFilters(false);
  }

  useEffect(() => {
    loadListAsync()
  }, [])


  return (
    <div className='w-full'>
      <div>
        <div className='text-xl text-bold'>Ilość znalezionych ofert: {data.totalPages || "0"}</div>
        <div>
          <Button onClick={()=>{setOpenFilters(!openFilters)}}>FILTRY</Button>
        </div>
      </div>
      <div>
        <OfertsList list={data.data}/>
      </div>
      {openFilters && (
        <div>
          <MainSearch filters={filters} setFilters={setFilters} onSearch={handleSearch} />
        </div>
      )}
    </div>
  )
}

export default Offers