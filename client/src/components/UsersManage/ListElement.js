import { Button } from '@vechaiui/react'
import React from 'react'

const ListElement = ({data}) => {
  return (
    <tr key={ data.id }>
      <td className='p-2'>
        <div className='font-medium text-gray-400'>
          { data?.id }
        </div>
      </td>
      <td className='p-2'>
        <div className='font-medium text-gray-400'>
          { data?.email }
        </div>
      </td>
      <td className='p-2'>
        <div className='font-medium text-gray-400'>
          { data?.name }
        </div>
      </td>
      <td className='p-2'>
        <div className='font-medium text-gray-400'>
          { data?.role }
        </div>
      </td>
      <td className='p-1'>
        <div className='font-medium text-gray-400'>
          <Button variant='ghost' size='xs'>Edytuj </Button>
        </div>
      </td>
    </tr>
  )
}

export default ListElement