import React, {useEffect, useState} from 'react'
import {Button, FormLabel, FormControl, Input} from "@vechaiui/react";
import axiosPrivate from "../../utils/apiPrivate";
import useAuth from "../../hooks/useAuth";

const Company = () => {
	const { auth } = useAuth()
	const [edit, setEdit] = useState(false)
	const [form, setForm] = useState({
		companyName: '',
		nip: '',
		city: '',
		street: '',
		zipCode:'',
		firstName: '',
		surName: '',
		phone: '',
		email: ''
	})

	useEffect(() => {
		async function load() {
			try {
				const res = await axiosPrivate(auth.accessToken).get('/settings/get')
				if (res.status === 200) {
					console.log(res.data.settings)
					setForm({
						companyName: res.data.settings.companyDetails.name,
						nip: res.data.settings.companyDetails.nip,
						city: res.data.settings.companyDetails.city,
						street: res.data.settings.companyDetails.street,
						zipCode: res.data.settings.companyDetails.zipCode,
						firstName: res.data.settings.ownerDetails.firstName,
						surName: res.data.settings.ownerDetails.surName,
						phone: res.data.settings.contact.phoneNumber,
						email: res.data.settings.contact.email
					})
				}
			} catch (err) {
				console.log(err)
			}
		}

		load()
	}, [])

	function handleChange(e){
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}
	async function handleSave () {
		try {
			const res = await axiosPrivate(auth.accessToken).put('/settings/update', {
				settings: form
			})

			if (res.status === 200) {
				console.log('Zaktualizowano')
				setEdit(false)
			}
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className="p-3 w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
			<header className="px-1 sm:px-5 py-4 border-b border-gray-100 flex items-center justify-between ">
				<div className="font-semibold text-gray-900 sm:text-2xl text-xl">Firma</div>
				<Button.Group attached variant="outline">
					{edit && <Button onClick={handleSave} variant="solid" color="green">Zapisz</Button>}
					<Button onClick={()=>setEdit(!edit)} variant="solid">{edit ? "Anuluj" : "Edytuj"}</Button>
				</Button.Group>

			</header>
			<div className='flex flex-col sm:items-center'>
				<div className='sm:w-1/2 flex flex-col items-center pb-5 '>
					<div className='text-xl w-full font-semibold text-slate-700'>Dane firmy</div>
					<FormControl className='text-sm mt-2 py-1' disabled={!edit}>
						<FormLabel className='block text-sm font-medium leading-none text-gray-700'>Nazwa Firmy</FormLabel>
						<Input
							id='companyName'
							name='companyName'
							color={"primary"}
							onChange={handleChange}
							value={form.companyName}
						/>
					</FormControl>
					<FormControl className='text-sm mt-2 py-1 md:w-1/2 self-start' disabled={!edit}>
						<FormLabel className='block text-sm font-medium leading-none text-gray-700'>Nip</FormLabel>
						<Input
							id='nip'
							name='nip'
							color={"primary"}
							onChange={handleChange}
							value={form.nip}
						/>
					</FormControl>
					<div className='w-full md:grid grid-cols-3 gap-2'>
						<FormControl className='col-span-2 text-sm mt-2 py-1' disabled={!edit}>
							<FormLabel className='block text-sm font-medium leading-none text-gray-700'>Miasto</FormLabel>
							<Input
								id='city'
								name='city'
								color={'primary'}
								onChange={handleChange}
								value={form.city}
							/>
						</FormControl>
						<FormControl className='text-sm mt-2 py-1' disabled={!edit}>
							<FormLabel className='block text-sm font-medium leading-none text-gray-700'>Kod pocztowy</FormLabel>
							<Input
								id='zipCode'
								name='zipCode'
								color='primary'
								onChange={handleChange}
								value={form.zipCode}
							/>
						</FormControl>
					</div>
					<FormControl className='text-sm mt-2 py-1' disabled={!edit}>
						<FormLabel className='block text-sm font-medium leading-none text-gray-700'>Ulica</FormLabel>
						<Input
							id='street'
							name='street'
							color={'primary'}
							onChange={handleChange}
							value={form.street}
						/>
					</FormControl>
				</div>
				<div className='sm:w-1/2 flex flex-col items-center pb-5'>
					<div className='text-xl w-full font-semibold text-slate-700' >Dane Kontatkowe</div>
					<div className='w-full md:grid gap-2 grid-cols-2'>
						<FormControl className='text-sm mt-2 py-1' disabled={!edit}>
							<FormLabel className='block text-sm font-medium leading-none text-gray-700'>
								Imię
							</FormLabel>
							<Input
								id='firstName'
								name='firstName'
								color={'primary'}
								onChange={handleChange}
								value={form.firstName}
							/>
						</FormControl>
						<FormControl className='text-sm mt-2 py-1' disabled={!edit}>
							<FormLabel className='block text-sm font-medium leading-none text-gray-700'>
								Nazwisko
							</FormLabel>
							<Input
								id={'surName'}
								name={'surName'}
								color={'primary'}
								onChange={handleChange}
								value={form.surName}
							/>
						</FormControl>
					</div>
					<FormControl className='text-sm mt-2 py-1' disabled={!edit}>
						<FormLabel className='block text-sm font-medium leading-none text-gray-700'>
							Telefon
						</FormLabel>
						<Input
							id={'phone'}
							name={'phone'}
							color={'primary'}
							onChange={handleChange}
							value={form.phone}
						/>
					</FormControl>
					<FormControl className='text-sm mt-2 py-1' disabled={!edit}>
						<FormLabel className='block text-sm font-medium leading-none text-gray-700'>
							Email
						</FormLabel>
						<Input
							id={'email'}
							name={'email'}
							color={'primary'}
							onChange={handleChange}
							value={form.email}
						/>
					</FormControl>
				</div>
			</div>
		</div>
	)
}

export default Company