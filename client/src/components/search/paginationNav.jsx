import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@vechaiui/react'
import React from 'react'

const PaginationNav = ({page, setPage}) => {
  function updatePage (number) {
    if ( (page.current < page.max && number > 0) || (number < 0 && page.current > 1))
      setPage(currentPage => {
        console.log("SET PAGE HOOK", currentPage)
        return {...currentPage, current: currentPage.current + number}
      })
  }

  return (
    <div>
      <span className='mr-1'>
        <IconButton onClick={()=>{updatePage(-1)}}>
          <ChevronLeftIcon />
        </IconButton>
      </span>
      <span className='font-medium'>{page.current}</span>
      <span className='font-medium'> / {page.max}</span>
      <span className='ml-1'>
        <IconButton onClick={() => {updatePage(1)}}>
          <ChevronRightIcon />
        </IconButton>
      </span>
    </div>
  )
}

export default PaginationNav