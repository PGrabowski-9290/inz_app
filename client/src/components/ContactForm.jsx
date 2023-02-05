import { AtSymbolIcon } from '@heroicons/react/24/solid'
import { Button, FormControl, FormLabel, Input, Textarea } from '@vechaiui/react'
import React, { useState } from 'react'

const ContactForm = ({setTitle, editTitle = false, onSubmit = () => { console.log("On Submit call") } }) => {
  const [formData, setFormData] = useState({
    title: setTitle || "",
    replyTo:  "",
    text: ""
  })

  function handleFormChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleSubmit(e,){
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: setTitle || "",
      replyTo:  "",
      text: ""
    })
  }

  return (
    <div className='flex items-center justify-center overflow-hidden shrink-0'>
      <div className='bg-white shadow-lg rounded w-full px-2 py-3 sm:w-2/3 md:w-2/4 xl:w-2/5'>
        <p className='focus:outline-none text-xl font-extrabold leading-6 text-gray-800 text-center sm:text-center px-6 '>Skontaktuj się</p>
        <hr className='my-2'/>
        <div className='px-2'>
          <FormControl>
            <FormLabel className='text-gray-500'>Email</FormLabel>
            <Input.Group>
              <Input.LeftElement 
                children={<AtSymbolIcon className='w-4 h-4 text-indigo-600'/>}
              />
              <Input
                id='replyTo'
                name='replyTo'
                value={formData.replyTo}
                onChange={handleFormChange}
                placeholder="Adres e-mail"
                color='indigo'
              />
            </Input.Group>
          </FormControl>
          <FormControl>
            <FormLabel className='text-gray-500'>Tytuł</FormLabel>
            <Input
              id='title'
              name='title'
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Tytuł"
              disabled={!editTitle}
              color='indigo'
            />
          </FormControl>
          <FormControl>
            <FormLabel className='text-gray-500'>Treść</FormLabel>
            <Textarea
              id='text'
              name='text'
              value={formData.text}
              onChange={handleFormChange}
              placeholder=""
              color='indigo'
            />
          </FormControl>
          <FormControl className='mt-2 w-full flex justify-center'>
            <Button
              color='indigo' 
              onClick={handleSubmit}
              className="w-full sm:w-1/2 md:w-1/3"
            >
              WYŚLIJ
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default ContactForm