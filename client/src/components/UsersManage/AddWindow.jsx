import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button, FormControl, FormLabel, Input, Select, useNotification } from "@vechaiui/react"
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import axiosPrivate from '../../utils/apiPrivate'
import { isValid } from "../../utils"

const AddWindow = ({ setIsOpen }) => {
  const notification = useNotification()
  const handleNotification = (status, text) => {
    notification({
      title: text,
      status: status,
      position: "bottom-right",
      closeable: true,
      duration: 3000
    })
  }
  const [showPass, setShowPass] = useState(false)
  const [formData,setFormData] = useState({
    role:  '',
    email: '',
    name:  '',
    password: ''
  })
  const [formError, setFormError] = useState({
    role:  false,
    email: false,
    name:  false,
    password: false
  })
  const {auth} = useAuth()
  
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleToggleShowPass()
  {
    setShowPass(!showPass)
  }

  function handleClickClose() {
    setIsOpen(false)
  }

  async function handleClickSave(){
    try {
      if (isValid(formData, setFormError)) return handleNotification("warning", "Uzupełnij dane")

      const response = await axiosPrivate(auth.accessToken).post('/auth/register', {
        email: formData.email,
        password: formData.password,
        role:formData.role,
        name: formData.name
      })
      
      if(response.status === 200){
        handleNotification("success", "Zapisano")
        setIsOpen(false)
      }
    }catch(err){
      handleNotification("error", err?.response?.data?.message)
      console.log(err?.response?.data?.message)
    }
  }

  const options = [
    {
      label: "Admin",
      value: "admin"
    },
    {
      label: "User",
      value: "user"
    }
  ]

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-gray-a60 flex items-start justify-center z-10'>
      <div className='bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-11/12 lg:px-10 sm:px-6 sm:py-10 px-2 py-6 mt-8 my-1'>
        <div className='flex items-center justify-between text-sm sm:text-base'>
          <div className="space-x-4">
            <span className="text-gray-900 text-bold uppercase">
              Dodanie nowego użytkownika
            </span>
          </div>
          <Button onClick={()=>handleClickClose()} size="sm" className="text-base" type="button">
            <XMarkIcon className='w-6 h-6' />
          </Button>
        </div>
        <div className="w-full flex items-center justify-between pt-2">
          <hr className="w-full bg-gray-400" />
        </div>
        <FormControl className="text-sm mt-3 py-1" required={true} invalid={formError.email}>
          <FormLabel 
            htmlFor="email">
              Email
          </FormLabel>
          <Input 
            id="email"
            name="email"
            aria-labelledby="email"
            type="email"
            placeholder="Email"
            size="sm"
            value={formData.email}
            onChange={handleChange}/>  
        </FormControl>
        <FormControl className="text-sm mt-3 py-1" required={true} invalid={formError.name}>
          <FormLabel 
            htmlFor="name">
              Nazwa
          </FormLabel>
          <Input 
            id="name"
            name="name"
            aria-labelledby="name"
            placeholder="Nazwa"
            size="sm"
            value={formData.name}
            onChange={handleChange}/>  
        </FormControl>
        <FormControl className="text-sm mt-3 py-1" required={true} invalid={formError.role}>
          <FormLabel 
            htmlFor="role">
              Rola
          </FormLabel>
          <Select 
            id="role"
            name="role"
            aria-labelledby="role"
            type="email"
            placeholder="Rola"
            size="sm"
            value={formData.role}
            onChange={handleChange}
            >
            {options.map( (option, index) => {
              return <option key={index} value={option.value}>{option.label}</option>
            })}
          </Select>  
        </FormControl>
        <FormControl className="text-sm mt-3 py-1" required={true} invalid={formError.password}>
          <FormLabel 
            htmlFor="password">
              Hasło
          </FormLabel>
          <Input.Group>
            <Input 
              id="password"
              name="password"
              aria-labelledby="password"
              placeholder="Hasło"
              size="sm"
              value={formData.password}
              type={showPass ? 'text' : 'password'}
              onChange={handleChange}/>
              <Input.RightElement >
                <Button 
                  type="button"
                  size="xs"
                  variant="link"
                  onClick={handleToggleShowPass}
                >
                  {showPass ? <EyeIcon className="w-6 h-6"/> : <EyeSlashIcon className="w-6 h-6"/> }
                </Button>
              </Input.RightElement>
          </Input.Group>
        </FormControl>
        <div className="w-full flex items-center justify-between pt-2">
          <hr className="w-full bg-gray-400" />
        </div>
        <div className="flex py-2 items-center justify-end">
          <Button type="submit" size="sm" onClick={() => {handleClickSave()}}>
            Zapsiz
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddWindow