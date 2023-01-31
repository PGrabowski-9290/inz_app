import { Button } from '@vechaiui/react'
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
        <Button className='text-bold text-lg' onClick={()=>{updatePage(-1)}}>
          {"<"}
        </Button>
      </span>
      <span className='text-medium'>{page.current}</span>
      <span className='text-bold'> / {page.max}</span>
      <span className='ml-1'>
        <Button className='text-bold text-lg' onClick={() => {updatePage(1)}}>
          {'>'}
        </Button>
      </span>
    </div>
  )
}

export default PaginationNav