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

  function updatePage (number) {
    //if ( number > 3 && number < 3 ) {
      setPage(curentPage => {
        return curentPage + number
      })
    
    console.log("Amount: ", page)
  }

  async function loadListAsync() {
    try {
      var url;
      
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
        return setData(result.data)
      }

      return setData([])
    } catch (error) {
      console.error(error)
    }
  }

  function handleSearch () {
    setOpenFilters(false);
    loadListAsync()
  }

  useEffect(() => {
    loadListAsync()
  }, [])


  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between items-center'>
        <div className='text-xl'>
          <span className='mr-1'><Button onClick={()=>{updatePage(-1)}}>{"<"}</Button></span>
          <span className='text-medium'>{page}</span>
          <span className='text-bold'> / {data.totalPages || "0"}</span>
          <span className='ml-1'><Button onClick={() => {updatePage(1)}}>{">"}</Button></span>
        </div>
        <div>
          <Button onClick={()=>{setOpenFilters(!openFilters)}}>FILTRY</Button>
        </div>
      </div>
      <div>
        <OfertsList list={data.data}/>
      </div>
      {openFilters && (
        <div className='relative top-0 left-0 w-full h-full z-10 bg-gray-100'>
          <MainSearch filters={filters} setFilters={setFilters} onSearch={handleSearch} />
        </div>
      )}
    </div>
  )
}

export default Offers