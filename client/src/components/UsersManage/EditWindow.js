import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button, FormControl, FormLabel, Input, Select, Switch } from "@vechaiui/react"
import React, { useEffect, useState } from 'react'

const EditWindow = ({ data,setData, setIsOpen }) => {
  const [roleVal, setRoleVal] = useState(data?.role || '')
  const [emailVal, setEmailVal] = useState(data?.email || '')
  const [nameVal, setNameVal] = useState(data?.name || '')
  const [passVal, setPassVal] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [changePassword, setChangePassword] = useState(false)

  const handleToggleShowPass = () => setShowPass(!showPass)

  useEffect(()=>{
    if (data === undefined) {
      setChangePassword(true)
    }
  },[data])

  const handleClickClose = () => {
    setData(undefined)
    setIsOpen(false)
  }

  const handleClickSave = async () => {
    // todo send axios to update user information
    //
    setData(undefined)
    setIsOpen(false)
  }
  
  console.log(data)

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
            <span className="text-gray-900 text-bold uppercase">{
              data ? "Edycja Użytkownika"
              : "Dodanie nowego użytkownika"
            }</span>
          </div>
          <Button onClick={()=>handleClickClose()} size="sm" className="text-base" type="button">
            <XMarkIcon className='w-6 h-6' />
          </Button>
        </div>
        <div className="w-full flex items-center justify-between pt-2">
          <hr className="w-full bg-gray-400" />
        </div>
        <FormControl className="text-sm mt-3 py-1" disabled={true}>
          <FormLabel 
            htmlFor="email">
              Email
          </FormLabel>
          <Input 
            id="email"
            aria-labelledby="email"
            type="email"
            placeholder="Email"
            size="sm"
            value={emailVal}
            onChange={(e)=>{setEmailVal(e.target.value)}}/>  
        </FormControl>
        <FormControl className="text-sm mt-3 py-1">
          <FormLabel 
            htmlFor="name">
              Nazwa
          </FormLabel>
          <Input 
            id="name"
            aria-labelledby="name"
            placeholder="Nazwa"
            size="sm"
            value={nameVal}
            onChange={(e)=>{setNameVal(e.target.value)}}/>  
        </FormControl>
        <FormControl className="text-sm mt-3 py-1" disabled={data?.isSuperAdmin}>
          <FormLabel 
            htmlFor="role">
              Rola
          </FormLabel>
          <Select 
            id="role"
            aria-labelledby="role"
            type="email"
            placeholder="Rola"
            size="sm"
            value={roleVal}
            onChange={(e) => { setRoleVal(e.target.value)}}
            >
            {options.map( (option, index) => {
              return <option key={index} value={option.value}>{option.label}</option>
            })}
          </Select>  
        </FormControl>
        <div className="w-full flex items-center justify-between pt-2">
          <hr className="w-full bg-gray-400" />
        </div>
        {data?._id && <FormControl className="pt-3 flex items-center space-x-4">
          <FormLabel htmlFor="toggleChangePass">Zmień hasło</FormLabel>
          <Switch id="toggleChangePass" size="sm" onChange={() => {setChangePassword(!changePassword)}}></Switch>
        </FormControl>}
        <FormControl className="text-sm mt-3 py-1" disabled={!changePassword}>
          <FormLabel 
            htmlFor="password">
              Hasło
          </FormLabel>
          <Input.Group>
            <Input 
              id="password"
              aria-labelledby="password"
              placeholder="Hasło"
              size="sm"
              value={passVal}
              type={showPass ? 'text' : 'password'}
              onChange={(e)=>{setPassVal(e.target.value)}}/>
              <Input.RightElement >
                <Button type="button" size="xs" variant="link" onClick={handleToggleShowPass}>
                  {showPass ? <EyeIcon className="w-6 h-6"/> : <EyeSlashIcon className="w-6 h-6"/> }
                </Button>
              </Input.RightElement>
          </Input.Group>
        </FormControl>
        <div className="w-full flex items-center justify-between pt-2">
          <hr className="w-full bg-gray-400" />
        </div>
        <div className="flex py-2 items-center justify-between">
          <div>
            {data?.isSuperAdmin && <span className="text-red-600 text-sm">Główny Administrator</span>}
          </div>
          <Button type="submit" size="sm" onClick={() => {handleClickSave()}}>
            Zapsiz
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditWindow