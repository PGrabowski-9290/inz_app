import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, FormControl, FormLabel, Input, Switch } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import useAuth from "../hooks/useAuth";
import axiosPrivate from '../utils/apiPrivate';

const Profile = () => {
  const { auth } = useAuth()
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    name: '',
    password: ''
  })
  const [changePass, setChangePass] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleToggleShowPass = () => setShowPass(!showPass)

  const loadUserData = async () => {
    try {
      const result = await axiosPrivate(auth.accessToken).get('/user/get')
      setFormData({
        ...formData,
        id: result.data?.user?._id,
        email: result.data?.user?.email,
        name:result.data?.user?.name
      })
    }catch(err){
      console.log(err.response.data.message)
    }
  }
  
  const handleClickSave = async (e) => {
    e.preventDefault()
    console.log("Save Clicked")
  }

  useEffect(()=>{
    loadUserData()
  },[])
  

  return (
    <div className="p-3 w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-1 sm:px-5 py-4 border-b border-gray-100 flex items-center justify-between ">
        <div className="font-semibold text-gray-900 sm:text-2xl text-xl">Profil</div>
        <Button.Group attached variant="outline">
          <Button onClick={()=>setEdit(!edit)}>{edit ? "Anuluj" : "Edytuj"}</Button>
          {edit && <Button onClick={()=>handleClickSave()} className='bg-green-200 hover:bg-green-300'>Zapisz</Button>}
        </Button.Group>
        
      </header>
      <div className='flex flex-col sm:items-center'>
        <div className='sm:w-1/2 flex flex-col items-center pb-5'>
          <FormControl className="text-sm mt-2 py-1" disabled={true}>
              <FormLabel 
                htmlFor="email"
                className='sm:font-bold md:text-xl'>
                  Email
              </FormLabel>
              <Input 
                id="email"
                name="email"
                aria-labelledby="email"
                type="email"
                placeholder="Email"
                size="md"
                value={formData.email}
                onChange={handleChange}/>  
            </FormControl>
            <FormControl className="text-sm mt-2 py-1" disabled={!edit}>
              <FormLabel
                className='sm:font-bold md:text-xl' 
                htmlFor="name">
                  Nazwa
              </FormLabel>
              <Input 
                id="name"
                name="name"
                aria-labelledby="name"
                placeholder="Nazwa"
                size="md"
                value={formData.name}
                onChange={handleChange}/>  
            </FormControl>
            <FormControl className='mt-2 flex items-center space-x-4' disabled={!edit}>
              <FormLabel htmlFor="passChange">Zmień hasło</FormLabel>
              <Switch id="passChange" name="passChange" aria-labelledby='passChange' size="md" onChange={()=> {setChangePass(!changePass)} } disabled={!edit}/>
            </FormControl>
            <FormControl disabled={(!changePass || !edit)}>
              <FormLabel htmlFor='password' className='sm:font-bold md:text-xl'>
                Hasło
              </FormLabel>
              <Input.Group>
                <Input
                  id="password"
                  name="password"
                  aria-labelledby='password'
                  placeholder='Hasło'
                  size="md"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPass? 'text' : 'password'}
                  />
                  <Input.RightElement>
                    <Button type="button" size='xs' variant='link' onClick={handleToggleShowPass} disabled={!edit}>
                      {showPass ? <EyeIcon className="w-6 h-6"/> : <EyeSlashIcon className="w-6 h-6"/> }
                    </Button>
                  </Input.RightElement>
              </Input.Group>
            </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Profile