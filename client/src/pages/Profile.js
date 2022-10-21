import { Button, FormControl, FormLabel, Input, Switch } from '@vechaiui/react'
import React, { useState } from 'react'

const Profile = () => {
  const [edit, setEdit] = useState(false)
  const [emailVal, setEmailVal] = useState('')
  const [nameVal, setNameVal] = useState('')
  const [passVal, setPassVal] = useState('')
  const [id, setId] = useState(null)
  const [changePass, setChangePass] = useState(false)

  const handleClickSave = () => {
    console.log("Save Clicked")
  }

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
        <div className='sm:w-1/2 flex flex-col items-center'>
          <FormControl className="text-sm mt-2 py-1" disabled={true}>
              <FormLabel 
                htmlFor="email"
                className='sm:font-bold md:text-xl'>
                  Email
              </FormLabel>
              <Input 
                id="email"
                aria-labelledby="email"
                type="email"
                placeholder="Email"
                size="md"
                value={emailVal}
                onChange={(e)=>{setEmailVal(e.target.value)}}/>  
            </FormControl>
            <FormControl className="text-sm mt-2 py-1" disabled={!edit}>
              <FormLabel
                className='sm:font-bold md:text-xl' 
                htmlFor="name">
                  Nazwa
              </FormLabel>
              <Input 
                id="name"
                aria-labelledby="name"
                placeholder="Nazwa"
                size="md"
                value={nameVal}
                onChange={(e)=>{setNameVal(e.target.value)}}/>  
            </FormControl>
            <FormControl className='mt-2 flex items-center space-x-4' disabled={!edit}>
              <FormLabel htmlFor="passChange">Zmień hasło</FormLabel>
              <Switch id="passChange" aria-labelledby='passChange' size="md" onChange={()=> {setChangePass(!changePass)} } disabled={!edit}/>
            </FormControl>
            <FormControl disabled={(!changePass || !edit)}>
              <FormLabel htmlFor='password' className='sm:font-bold md:text-xl'>
                Hasło
              </FormLabel>
              <Input.Group>
                <Input
                  id="password"
                  aria-labelledby='password'
                  placeholder='Hasło'
                  size="md"
                  value={passVal}
                  onChange={(e) => {setPassVal(e.target.value)}}

                  />
              </Input.Group>
            </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Profile