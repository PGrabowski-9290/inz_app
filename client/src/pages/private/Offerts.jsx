import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Icon, IconButton, Select } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import OffertsList from '../../components/offerts/OffertsList';
import MainSearch from '../../components/search/MainSearch';
import PaginationNav from '../../components/search/paginationNav';
import { listElementsSize } from '../../enums';
import useAuth from '../../hooks/useAuth';
import useFilter from '../../hooks/useFilter';
import axiosPrivate from "../../utils/apiPrivate";

const OffertsPrivate = () => {
  const { filter } = useFilter()
  const { auth } = useAuth()
  const [data, setData] = useState([])
  const [openFilters, setOpenFilters] = useState(false)
  const [limit, setLimit] = useState(listElementsSize[0].value)
  const [page, setPage] = useState({current: 1, max: 1})

  

  function handleLimitChange (e) {
    setLimit(e.target.value)
  }

  function handleSearch () {
    setOpenFilters(false);
  }


  useEffect(() => {
    async function loadListAsync() {
      try {
        const result = await axiosPrivate(auth.accessToken).post(`/offerts/filter?limit=${limit}&page=${page.current}`,
          {filter: filter},
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
  }, [limit, page.current, filter])


  return (
    <>
      <div className='w-full'>
        {openFilters ? (
          <div className='top-4 left-0 w-full h-full z-10 bg-gray-100'>
            <div className="mt-4 sm:mt-10">
              <MainSearch onSearch={handleSearch} onClose={()=>{setOpenFilters(false)}} showControlBtn={true}/>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  )
}

export default OffertsPrivate