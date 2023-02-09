import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, IconButton } from '@vechaiui/react';
import React, { useRef, useState } from 'react';

const AddPhoto = ({form, setForm}) => {
  const [files, setFiles] = useState([])
  const input = useRef(null)

  function handleSelect(e){
    input.current.click()
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className='flex flex-col sm:flex-row flex-no-wrap gap-2'>
        <input type="file" accept='image/*' id='photos' name='photos[]' onChange={handleChange} multiple ref={input} style={{display: 'none'}}/>
      <div className='flex flex-col justify-center sm:justify-start basis-1/4'>
        <Button size='xl' onClick={handleSelect}>Wybierz zdjęcie</Button>
        <div>
          <p className='text-center w-full mt-3 text-gray-600'>Wybrane zdjęcia:</p>
          <ul>
            <li className='inline-flex py-1'>
              <IconButton variant='link'>
                <TrashIcon className='text-indigo-600 w-5 h-5 mr-1'/>
              </IconButton>  
              <span>Photo 1</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='basis-3/4'>a</div>
    </div>
  )
}

export default AddPhoto