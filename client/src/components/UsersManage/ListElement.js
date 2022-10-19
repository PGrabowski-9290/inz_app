import { Button } from '@vechaiui/react'
import React from 'react'

const ListElement = ({data, edit, setIsOpen}) => {
  const handleClickEdit = () => {
    edit(data)
    setIsOpen(true)
  }

  return (
    <tr>
      <td className='p-2'>
        <div className='font-medium'>
          { data?.id }
        </div>
      </td>
      <td className='p-2'>
        <div className='font-medium'>
          { data?.email }
        </div>
      </td>
      <td className='p-2'>
        <div className='font-medium'>
          { data?.name }
        </div>
      </td>
      <td className='p-2 sm:table-cell hidden'>
        <div className='font-medium'>
          { data?.role }
        </div>
      </td>
      <td className='p-1 flex items-center justify-center'>
        <div className='font-medium'>
          <Button onClick={() => handleClickEdit()} variant='ghost' size='xs'>Edytuj </Button>
        </div>
      </td>
    </tr>
  )
}

export default ListElement