import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../utils/publicApi";

const OffertDetails = () => {
  const location = useLocation()
  const offertId = location?.state.id || null;
  const [data, setData] = useState()



  useEffect( () => {
    async function fetchData(id) {
      try {
        const result = await axios.get(`/offerts/public/details/${id}`);
  
        if ( result.status === 200 ){
          setData(result.data.data)
        }
      } catch (error) {
        console.error("Błąd pobierania danych: ",error)
      }
    }
    
    if (offertId)
      fetchData(offertId)
  }, [])


  return (
    <div className='w-full rounded shadow-lg'>
      <div className='flex flex-col md:flex-row'>
        <div className='md:basis-3/4'>gallery component</div>
        <div className='md:basis-1/4 p-2'>price contact info</div>
      </div>
      <div className='mt-2'>
        detils
      </div>
    </div>
  )
}

export default OffertDetails