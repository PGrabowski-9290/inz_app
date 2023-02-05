import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Button } from '@vechaiui/react'
import React, { useEffect, useState } from 'react'
import axiosPublic from '../../utils/publicApi.js'

const Salons = () => {
  const [salonsList, setSalonsList] = useState([])

  useEffect(() => {
    async function get() {
      try {
        const result = await axiosPublic.get('/salons')

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
      <div className='w-full'>
        {!salonsList[0] === undefined ? (
          <div className='w-full p-2 py-4 rounded-md shadow-md flex gap-4'>Brak aktywnych salonów</div>
        ) : (
          salonsList.map((salon, index) => {
            return (
              <div key={index} className='w-full p-2 py-4 rounded-md shadow-lg md:w-2/5'>
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
              </div>
            )
          })
        )
        
        }
      </div>
    </div>
  )
}

export default Salons