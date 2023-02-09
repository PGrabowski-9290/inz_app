import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, FormControl, FormLabel, IconButton, Input, Tag } from '@vechaiui/react'
import React, { useState } from 'react'
import './index.css'

const AddFunctionalities = ({form, setForm}) => {
  const [value, setValue] = useState("")

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleAdd(){
    setForm({
      ...form,
      functionalities: [ ...form.functionalities ,value]
    })
    setValue("")
  }

  function handleRemove(id) {
    setForm({
      ...form,
      functionalities: form.functionalities.filter((item, index) => index !== id )
    })
  }
  
  return (
    <div>
      <FormControl id='title' className='text-lg mt-2 py-1'>
        <FormLabel className='block text-base font-medium leading-none text-gray-500'>Nazwa funkcjonalności</FormLabel>
        <Input.Group size='lg'>
          <Input
            className='pr-24'
            id='title'
            name='title'
            value={value}
            onChange={handleChange}
            placeholder="Funkcjonalność"
          />
          <Input.RightElement className='w-20'>
            <Button variant='solid' size='md' onClick={handleAdd}>Dodaj</Button>
          </Input.RightElement>
        </Input.Group>
      </FormControl>
      <div className='flex flex-wrap gap-5 mt-5 px-2 md:p-3 '>
        {form.functionalities?.length === 0 ? (
          <>
            Brak
          </>
        ) : ( 
          form.functionalities?.map((item, index) => {
            return (
              <>
                <div key={index} className="tag outline outline-indigo-600 outline-1 outline-offset-1 pl-2">
                  <span className='text-gray-700'>{item}</span>
                  <IconButton onClick={() => handleRemove(index)} variant='link' className='text-indigo-600 opacity-50 hover:opacity-100'>
                    <XMarkIcon className='w-6 h-6'></XMarkIcon>
                  </IconButton>
                </div>
              </>
            )
          })
        )}
      </div>
    </div>
  )
}

export default AddFunctionalities