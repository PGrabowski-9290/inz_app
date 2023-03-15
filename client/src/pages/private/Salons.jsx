import React, {useEffect, useState} from 'react'
import axios from "../../utils/apiPrivate";
import {Button, cx, useNotification} from "@vechaiui/react";
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/24/outline";
import useAuth from '../../hooks/useAuth';
import OpenWindow from "../../components/OpenWindow";
import FormSalon from "../../components/salons/FormSalon";

const SalonsPrivate = () => {
  const {auth} = useAuth()
  const [salonsList, setSalonsList] = useState([])
  const [edit, setEdit] = useState({isOpen: false, id: null})
  const notification = useNotification()
  function handleNotification(status, text){
    notification({
      title: text,
      status: status,
      position: "bottom-right",
      closeable: true,
      duration: 3000
    })
  }
  function handleClose() {
    setEdit({isOpen: false, id: null});
  }

  function handleSuccess () {
    get()
    handleClose()
  }

  async function handleChangeStatus(e, status) {
    try {
      const id = e.target.getAttribute('data-id')
      console.log((Boolean(status)))
      console.log(!(Boolean(status)))
      const res = await axios(auth.accessToken).patch(`/salons/active/${id}`,
        {
          status: !(Boolean(status))
        })
      if (res.status === 200) {
        handleNotification("success","Zaktualizowano")
      }
      get()
    } catch (err) {
      handleNotification("error", "Błąd aktualizacji statusu")
      console.error(err)
    }


  }

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


  useEffect(() => {
    get()
  }, [])

  return (
    <div className='w-full'>
      <div className={'relative'}>
        <div className='text-2xl text-slate-700 font-semibold md:text-center p-3 rounded-md shadow-md '>Nasze salony sprzedaży</div>
        <div className={'absolute top-0 right-3 flex justify-center items-center h-full'}>
          <Button
            color={'primary'}
            onClick={() => setEdit({isOpen: true, id: null})}
          >
            DODAJ
          </Button>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md: grid-cols-2 gap-4 mt-4'>
        {!salonsList[0] === undefined ? (
            <div className='w-full p-2 py-4 rounded-md shadow-md flex gap-4'>Brak aktywnych salonów</div>
        ) : (
          salonsList.map((salon, index) => {
            return (
              <div key={index} className='w-full p-2 py-4 rounded-md shadow-lg '>
                <div className='font-semibold text-slate-600 text-center text-2xl'>{salon.location.zipCode+' '+salon.location.city+' '+salon.location.street}</div>
                <div className='flex flex-row flex-nowrap justify-around mt-2'>
                  <Button
                    color='primary'
                    variant='link'
                    className='cursor-pointer'
                    size='xl'
                    leftIcon={<EnvelopeIcon className='w-5 h-5 mr-1'/>}
                  >{salon.contact.email}</Button>

                  <Button
                    color='primary'
                    variant='link'
                    className='cursor-pointer'
                    size='xl'
                    leftIcon={<PhoneIcon className='w-5 h-5 mr-1'/>}
                  >{salon.contact.phoneNumber}</Button>
                </div>
                <hr  className="my-3"/>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-center text-slate-600 font-semibold">Status <span className={'pl-1'}>
                    <Button
                      data-value={salon?.isActive}
                      data-id={salon?._id}
                      onClick={(e) => {handleChangeStatus(e, salon?.isActive)}}
                      variant={'light'}
                      color={salon?.isActive ? 'green' : 'warning'}
                      className={cx(
                        "uppercase text-semibold",
                        salon?.isActive ? "text-green-600" : "text-red-600")}
                    >
                      {salon.isActive ? "Aktywny" : "Nieaktywny"}
                    </Button>
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
        )}
      </div>

      <OpenWindow open={edit.isOpen} onClose={handleClose}>
        {edit?.isOpen && <FormSalon id={edit?.id} onSuccess={handleSuccess} onError={handleClose} />}
      </OpenWindow>
    </div>
  )
}

export default SalonsPrivate