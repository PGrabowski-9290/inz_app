import { Button } from "@vechaiui/react"
import React from 'react'
import UsersTable from "../components/UsersManage/UsersTable"

const UsersManage = () => {
  const users = [
    {
      id: 1,
      role: "user",
      email: "user@user.pl",
      name: "User",
      isSuperAdmin: true
    },
    {
      id: 2,
      role: "test",
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
          <Button>Dodaj</Button>
        </header>
        <div className="overflow-x-auto p-3">
          <UsersTable users={users}/>
        </div>
      </div>
    </>
  )
}

export default UsersManage