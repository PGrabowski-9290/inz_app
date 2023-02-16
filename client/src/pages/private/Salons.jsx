import React, {useEffect, useState} from 'react'
import axios from "../../utils/apiPrivate";
import {Button, cx} from "@vechaiui/react";
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/24/outline";
import useAuth from '../../hooks/useAuth';
import OpenWindow from "../../components/OpenWindow";

const SalonsPrivate = () => {
  const {auth} = useAuth()
  const [salonsList, setSalonsList] = useState([])
  const [edit, setEdit] = useState({isOpen: false, id: null})

  useEffect(() => {
    async function get() {
      try {
        const result = await axios(auth.accessToken).get('/salons/list')

        if (result.status === 200) {
          setSalonsList(result.data.data)
          console.log(result.data.message)
        }
      }catch (error){
        console.error(error)
      }
    }

    get()
  }, [])

  return (
    <div className='w-full'>
      <div className='text-2xl text-slate-700 font-semibold text-center p-3 rounded-md shadow-md '>Nasze salony sprzedaży</div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {!salonsList[0] === undefined ? (
            <div className='w-full p-2 py-4 rounded-md shadow-md flex gap-4'>Brak aktywnych salonów</div>
        ) : (
          salonsList.map((salon, index) => {
            return (
              <div key={index} className='w-full p-2 py-4 rounded-md shadow-lg '>
                <div className='font-semibold text-slate-600 text-center text-2xl'>{salon.location.zipCode+' '+salon.location.city+' '+salon.location.street}</div>
                <div className='flex flex-row flex-nowrap justify-around mt-2'>
                  <Button
                    color='indigo'
                    variant='link'
                    className='cursor-pointer'
                    size='xl'
                    leftIcon={<EnvelopeIcon className='w-5 h-5 mr-1'/>}
                  >{salon.contact.email}</Button>

                  <Button
                    color='indigo'
                    variant='link'
                    className='cursor-pointer'
                    size='xl'
                    leftIcon={<PhoneIcon className='w-5 h-5 mr-1'/>}
                  >{salon.contact.phoneNumber}</Button>
                </div>
                <hr  className="my-3"/>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-center text-slate-600 font-semibold">Status <span className={cx(
                    "uppercase text-semibold",
                    salon?.isActive ? "text-green-600" : "text-red-600"
                  )}>
                    {salon.isActive ? "Aktywny" : "Nieaktywny"}
                  </span></div>
                  <div className={"justify-self-center"}>
                    <Button
                      size={"lg"}
                      className={"text-slate-600 font-semibold"}
                      onClick={() => setEdit({isOpen: true, id: salon._id})}
                    >
                      Edytuj
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        )

        }
      </div>

      <OpenWindow open={edit.isOpen} onClose={()=> setEdit({isOpen: false, id: null})}>
        <div>{edit.id}</div>
      </OpenWindow>
    </div>
  )
}

export default SalonsPrivate