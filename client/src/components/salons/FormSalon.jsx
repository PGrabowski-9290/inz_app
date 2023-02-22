import React, {useEffect, useState} from "react";
import {Button, cx, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Select} from '@vechaiui/react'
import axiosPrivate from "../../utils/apiPrivate";
import useAuth from "../../hooks/useAuth";
import {XMarkIcon} from "@heroicons/react/24/outline";
const FormSalon = ({ id, onError = () => {console.log("Data load error")} }) => {
    const { auth } = useAuth();
    const [form, setForm] = useState( {
        city: "",
        street: "",
        zipCode: "",
        phone: "",
        email: "",
        users: []
    })
    const [usersList, setUsersList] = useState([])
    const [selectedUser, setSelectedUser] = useState({_id:'', name: ''})

    function handleChange (e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    function handleSelectUser(e) {
        let tmpObj = {
            _id: e.target.value,
            name: e.target.selectedOptions[0].text
        }
        setSelectedUser(tmpObj)
    }

    function handleAddUserToList() {
        const exist = form.users.some(el => {
            if (el._id === selectedUser._id) {
                console.log('Użytkownik jest już dodany')
                return true
            }
        } )
        if (selectedUser._id !== '' && !exist ) {
            setForm({
                ...form,
                users: [...form.users, selectedUser]
            })
        }
        setSelectedUser({_id: '', name: ''})
    }

    function handleRemove (id){
        setForm({
            ...form,
            users: form.users.filter((item, index) => index !== id)
        })
    }
    async function handleSubmit () {
        try {
            console.log('submit')

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        async function loadUsersList() {
            try {
                const resultUsers = await axiosPrivate(auth.accessToken).get('/user/list');

                if (resultUsers.status === 200) {
                    return setUsersList(resultUsers.data?.list)
                }
            } catch (err) {
                console.error(err)
            }
        }
        async function loadData(salonID){
            try {
                const resultData = await axiosPrivate(auth.accessToken).get(`/salons/details/${salonID}`);

                if (resultData.status === 200 ) {
                    return setForm({
                        ...form,
                        city: resultData.data?.data?.location?.city,
                        street: resultData.data?.data?.location?.street,
                        zipCode: resultData.data?.data?.location?.zipCode,
                        phone: resultData.data?.data?.contact?.phoneNumber,
                        email: resultData.data?.data?.contact?.email
                    })
                }
                return onError()

            } catch (err) {
                console.error(err)
                return onError();
            }
        }
        loadUsersList()
        if (id !== "new") {
            loadData(id);
        }
    }, [])

    return (
        <div className='flex items-center justify-center overflow-hidden shrink-0'>
            <div className='bg-white shadow-lg rounded w-full px-2 py-3 sm:w-2/3 md:w-3/4 xl:w-3/5'>
                <div className='relative py-1'>
                    <p className='focus:outline-none text-2xl font-semibold leading-6 text-slate-700 text-center sm:text-center px-6'>{id === "new" ? "Dodaj salon" : "Edytuj salon"}</p>
                </div>
                <hr className={'my-2'} />
                <div className={'px-2'}>
                    <div className={'mt-3'}>
                        <h3 className="font-semibold text-gray-600 text-xl">Adres</h3>

                        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
                            <FormControl>
                                <FormLabel
                                  className={'text-gray-500'}>
                                    Miejscowość
                                </FormLabel>
                                <Input
                                    id={'city'}
                                    name={'city'}
                                    onChange={handleChange}
                                    value={form.city}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                  className={'text-gray-500'}>
                                    Kod pocztowy
                                </FormLabel>
                                <Input
                                    id={'zipCode'}
                                    name={'zipCode'}
                                    onChange={handleChange}
                                    value={form.zipCode}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                  className={'text-gray-500'}>
                                    Ulica i numer
                                </FormLabel>
                                <Input
                                    id={'street'}
                                    name={'street'}
                                    onChange={handleChange}
                                    value={form.street}
                                />
                            </FormControl>

                        </div>
                    </div>

                    <div className={'mt-3'}>
                        <h3 className="font-semibold text-gray-600 text-xl">Adres</h3>

                        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">

                            <FormControl>
                                <FormLabel
                                  className={'text-gray-500'}>
                                    Email
                                </FormLabel>
                                <Input
                                    id={'email'}
                                    name={"email"}
                                    onChange={handleChange}
                                    value={form.email}
                                />
                                <FormErrorMessage></FormErrorMessage>
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                  className={'text-gray-500'}>
                                    Telefon
                                </FormLabel>
                                <Input
                                    id={'phone'}
                                    name={'phone'}
                                    onChange={handleChange}
                                    value={form.phone}
                                />
                                <FormErrorMessage></FormErrorMessage>
                            </FormControl>

                        </div>
                    </div>

                    <div className={'mt-3'}>
                        <h3 className="font-semibold text-gray-600 text-xl">Przypisani użytkownicy</h3>
                        <div>
                            <FormControl>
                                <FormLabel className={'text-gray-500'}>Użytkownik</FormLabel>
                                <div className={'flex flex-row flex-nowrap'}>
                                    <Select
                                        id={'user'}
                                        name={'user'}
                                        value={selectedUser._id}
                                        onChange={handleSelectUser}
                                        className={cx(
                                          (selectedUser._id !== "" ? "text-black" : "text-gray-500")
                                        )}
                                        placeholder={'Wybierz użytkownika'}
                                    >
                                        {usersList
                                            ?.map((item, index) => {
                                                return  (
                                                  <option key={index} value={item._id}>
                                                      {item.email}
                                                  </option>
                                                )
                                            })}
                                    </Select>
                                    <Button
                                      className={'ml-1'}
                                      onClick={()=> handleAddUserToList()}
                                    >
                                        Dodaj
                                    </Button>
                                </div>
                            </FormControl>
                            <div className='flex flex-wrap gap-3 mt-2 px-2 md:p-3 '>
                                {form?.users.map((item, index) => {
                                    return (
                                      <div key={index} className="tag outline outline-indigo-600 outline-1 outline-offset-1 pl-2">
                                          <span className='text-gray-700'>{item.name}</span>
                                          <IconButton onClick={() => handleRemove(index)} variant='link' className='text-indigo-600 opacity-50 hover:opacity-100'>
                                              <XMarkIcon className='w-6 h-6'></XMarkIcon>
                                          </IconButton>
                                      </div>
                                    )
                                })

                                }
                            </div>
                        </div>

                    </div>

                    <div className={'mt-3 flex justify-end items-center'}>
                        <Button

                          color={"primary"}
                          onClick={handleSubmit}
                          size={"lg"}
                        >
                            Zapisz
                        </Button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default FormSalon