import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Icon, IconButton, Select } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OffertsList from '../../components/offerts/OffertsList';
import MainSearch from '../../components/search/MainSearch';
import PaginationNav from '../../components/search/paginationNav';
import { listElementsSize } from '../../enums';
import useAuth from '../../hooks/useAuth';
import axiosPrivate from "../../utils/apiPrivate";

const OffertsPrivate = () => {
  const location = useLocation()
  const { auth } = useAuth()
  const [data, setData] = useState([])
  const [openFilters, setOpenFilters] = useState(false)
  const [filters, setFilters] = useState(location?.state?.filters)
  const [limit, setLimit] = useState(listElementsSize[0].value)
  const [page, setPage] = useState({current: 1, max: 1})

  

  function handleLimitChange (e) {
    setLimit(e.target.value)
  }

  function handleSearch () {
    setOpenFilters(false);
  }


  useEffect(() => {
    setFilters(location.state?.filters)
    async function loadListAsync() {
      try {
        var url;
        console.log(filters?.make)
        if ( !filters ) {
          url = `/offerts/?limit=${limit}&page=${page.current}`
          console.log(location.state?.filters)
        }
        else {
          url = `/offerts/filter?limit=${limit}&page=${page.current}`
        }
  
        const result = await axiosPrivate(auth.accessToken).post(url,
          {filter: filters},
          {
            headers: { 'Content-Type': 'application/json'}
          }
        )
  
        if( result.status === 200 ) {
          setPage(currentPage => {
            return {
              current: (currentPage.current > result.data.totalPages) ? 1 : currentPage.current,
              max: result.data.totalPages
            }
          })

          return setData(result.data.data)
        }
  
        return setData([])
      } catch (error) {
        console.error(error)
      }
    }

    loadListAsync()
    console.log('test')
  }, [limit, page.current, filters])


  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between items-center'>
        <div className='text-xl flex flex-row flex-nowrap space-x-3'>
          <PaginationNav page={page} setPage={setPage}/>
          <div>
            <Select 
              value={limit} 
              onChange={handleLimitChange}
            >
              {listElementsSize.map((item, index) => {
                return (
                  <option value={item.value} key={index}>{item.name}</option>
                )
              })}
            </Select>
          </div>
        </div>
        <div>
          <Button 
            rightIcon={<Icon as={FunnelIcon} label="filter" className='w-4 h-4 ml-2'/>}
            className='font-medium' 
            onClick={()=>{setOpenFilters(!openFilters)}}
          >
            FILTRY
          </Button>
        </div>
      </div>
      <div>
        <OffertsList list={data}/>
      </div>
      {openFilters && (
        <div className='fixed top-16 left-0 w-full h-full z-10 bg-gray-100'>
          <div className="mt-4 sm:mt-10">
            <MainSearch  filters={filters} setFilters={setFilters} onSearch={handleSearch} />
          </div>
          <IconButton variant='ghost' className='absolute top-5 right-4 cursor-pointer' onClick={()=>{setOpenFilters(false)}}>
            <XMarkIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default OffertsPrivate