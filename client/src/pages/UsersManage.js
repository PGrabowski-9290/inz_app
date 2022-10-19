import { Button } from "@vechaiui/react"
import React, { useState } from 'react'
import EditWindow from "../components/UsersManage/EditWindow"
import UsersTable from "../components/UsersManage/UsersTable"


const UsersManage = () => {
  const [editWindow, setEditWindow] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const users = [
    {
      _id: 1,
      role: "admin",
      email: "user@user.pl",
      name: "User",
      isSuperAdmin: true
    },
    {
      _id: 2,
      role: "user",
      email: "test@user.pl",
      name: "Tester",
      isSuperAdmin: false
    }
  ]


  return (
    <>
      <div className="p-3 w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100 flex items-center justify-between ">
          <div className="font-semibold text-gray-900 sm:text-2xl text-xl">Użytkownicy</div>
          <Button onClick={()=>setIsOpen(true)}>Dodaj</Button>
        </header>
        <div className="overflow-x-auto p-3">
          <UsersTable users={users} edit={setEditWindow} setIsOpen={setIsOpen}/>
        </div>
      </div>
      {isOpen && <EditWindow data={editWindow} setData={setEditWindow} setIsOpen={setIsOpen}/>}
    </>
  )
}

export default UsersManage