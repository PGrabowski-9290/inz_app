import React from 'react'
import ListElement from './ListElement'
const UsersTable = ({ users, edit, setIsOpen }) => {
  return (
    <table className="table-auto w-full">
      <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
        <tr>
          <th className="p-2">
            <div className="font-semibold text-left">Lp.</div>
          </th>
          <th className="p-2">
            <div className="font-semibold text-left">Email</div>
          </th>
          <th className="p-2">
            <div className="font-semibold text-left">Nazwa</div>
          </th>
          <th className="p-2 sm:table-cell hidden">
            <div className="font-semibold text-left">Rola</div>
          </th>
          <th className="p-2">
            <div className="font-semibold text-center">Akcja</div>
          </th>
        </tr>
      </thead>

      <tbody className='text-sm text-gray-700 divide-y divide-gray-100'>
        { users?.map(
          (user, index) => {
            return <ListElement data={user} edit={edit} setIsOpen={setIsOpen} key={index}/>
          }
        ) }
      </tbody>
    </table>
  )
}

export default UsersTable