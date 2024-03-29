import { XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@vechaiui/react';
import React from 'react';

const OpenWindow = ({open, onClose, children}) => {
  return (
    <>
      {open && (
        <div className='fixed top-16 left-0 w-full h-full z-10 bg-gray-100'>
          <div className="mt-4 sm:mt-10">
            { children }
          </div>
          { onClose && 
            <IconButton variant='ghost' className='absolute top-5 right-4 cursor-pointer' onClick={()=>{onClose()}}>
              <XMarkIcon />
            </IconButton>
          }
      </div>
      )}
    </>
  )
}

export default OpenWindow