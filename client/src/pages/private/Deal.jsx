import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import BackButton from "../../components/BackButton";
import { Button, FormLabel, FormControl, Input } from '@vechaiui/react'
import axiosPrivate from "../../utils/apiPrivate";
import useAuth from "../../hooks/useAuth";
const Deal = () => {
	const { auth } = useAuth()
	const location = useLocation()
	const offertId = location?.state?.id
	const [form, setForm] = useState({
		offert: location?.state?.id,
		name: '',
		city: '',
		street: '',
		zipCode: '',
		phone: '',
		pesel: '',
		personalIdNumber: '',
		personalIdVerifiedBy: ''
	})
	const [dealId, setDealId] = useState(null)

	function handleChange(e) {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	async function getDeal() {
		try {
			const res = await axiosPrivate(auth.accessToken).get(`/deals/generate?id=${dealId}`,)
			if (res.status === 200) {
				console.log(res)

				const el = document.createElement('a')
				el.setAttribute('download', 'umowa')
				el.href = "data:application/pdf;base64," + res.data.file
				el.click()
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function generate() {
		try {
			const res = await axiosPrivate(auth.accessToken).post('/deals/new', {
				data: {
					offert: form.offert,
					name: form.name,
					address: {
						city: form.city,
						street: form.street,
						zipCode: form.zipCode
					},
					phone: form.phone,
					pesel: form.pesel,
					personalIdNumber: form.personalIdNumber,
					personalIdVerifiedBy: form.personalIdVerifiedBy
				}
			})

			if (res.status === 200 ) {
				console.log(res.data?.id)
				setDealId(res.data?.id)
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		async function check() {
			 try {
				 const res = await axiosPrivate(auth.accessToken).get(`/deals/check/${offertId}`)

				 if (res.status === 200){
					 setDealId(res.data?.status ? res.data?.deal : null)
				 }
			 } catch (err) {
				 console.log(err)
			 }
		}

		if (offertId) {
			check()
		}
	},[])

	if ( offertId === undefined) {
		return (
			<div className="w-full flex justify-center">
				<div className='w-full max-w-4xl'>
					<div className='p-2 shadow-lg mb-3 rounded-md bg-white flex justify-between items-center'>
						<BackButton path={'/a/offers/details'} state={{id: location?.state?.id}}></BackButton>
					</div>
					<div className='p-2 shadow-lg rounded-md bg-white flex flex-col gap-2'>
						<div>
							<h1 className='text-center text-2xl text-gray-600 font-semibold'>Brak danych oferty</h1>
							<hr className='mt-2'></hr>
							<span className={'text-slate-600 text-center w-full block'}>Spróbuj wybrać ponownie aktywną ofertę</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (dealId) {
		return (
			<div className="w-full flex justify-center">
				<div className='w-full max-w-4xl'>
					<div className='p-2 shadow-lg mb-3 rounded-md bg-white flex justify-between items-center'>
						<BackButton path={'/a/offers/details'} state={{id: location?.state?.id}}></BackButton>
					</div>
					<div className='p-2 shadow-lg rounded-md bg-white flex flex-col gap-2'>
						<div>
							<h1 className='text-center text-2xl text-gray-600 font-semibold'>Umowa KUPNA/SPRZEDAŻY</h1>
							<hr className='mt-2'></hr>
							<span className={'text-slate-600 text-center w-full block mt-2'}>Umowa jest już wygenerowana, kliknij poniżej aby pobrać</span>
						</div>
						<div className='flex flex-row justify-center items-center my-4'>
							<Button
								color='primary'
								size='xl'
								variant={'solid'}
								onClick={getDeal}
							>Pobierz umowę</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full flex justify-center">
			<div className='w-full max-w-4xl'>
				<div className='p-2 shadow-lg mb-3 rounded-md bg-white flex justify-between items-center'>
					<BackButton path={'/a/offers/details'} state={{id: location?.state?.id}}></BackButton>
					<Button
						color={'primary'}
						onClick={generate}
					>
						Generuj
					</Button>
				</div>
				<div className='p-2 shadow-lg rounded-md bg-white flex flex-col gap-2 mb-3'>
					<div>
						<h1 className='text-center text-2xl text-gray-600 font-semibold'>Umowa KUPNA/SPRZEDAŻY</h1>
						<hr className='mt-2'></hr>
					</div>
					<div className='flex flex-col'>
						<FormControl className="text-sm mt-2 py-1">
							<FormLabel htmlFor='name' className='block text-lg font-medium leading-none text-gray-700'>Imię nazwisko</FormLabel>
							<Input
								color={'primary'}
								id={'name'}
								name={'name'}
								onChange={handleChange}
								value={form.name}
								placeholder={'Imię nazwisko'}
							/>
						</FormControl>
						<div className='flex-col md:grid md:grid-cols-3 gap-2'>
							<FormControl className="text-sm mt-2 py-1 col-span-2">
								<FormLabel htmlFor={'city'} className='block text-lg font-medium leading-none text-gray-700'>Miasto</FormLabel>
								<Input
									color={'primary'}
									id='city'
									name='city'
									onChange={handleChange}
									value={form.city}
									placeholder={"Miasto"}
								/>
							</FormControl>
							<FormControl className="text-sm mt-2 py-1">
								<FormLabel htmlFor='zipCode' className='block text-lg font-medium leading-none text-gray-700'>Kod Pocztowy</FormLabel>
								<Input
									color={'primary'}
									id='zipCode'
									name='zipCode'
									onChange={handleChange}
									value={form.zipCode}
									placeholder={'Kod pocztowy'}
								/>
							</FormControl>
						</div>
						<FormControl className="text-sm mt-2 py-1">
							<FormLabel htmlFor='street' className='block text-lg font-medium leading-none text-gray-700'>Ulica</FormLabel>
							<Input
								id='street'
								name='street'
								color='primary'
								onChange={handleChange}
								value={form.street}
								placeholder={'Ulica, numer budynku'}
							/>
						</FormControl>
						<div className='md:grid md:grid-cols-2 gap-2'>
							<FormControl className="text-sm mt-2 py-1">
								<FormLabel htmlFor='pesel' className='block text-lg font-medium leading-none text-gray-700'>PESEL</FormLabel>
								<Input
									id='pesel'
									name='pesel'
									color='primary'
									onChange={handleChange}
									value={form.pesel}
									placeholder={'PESEL'}
								/>
							</FormControl>
							<FormControl className="text-sm mt-2 py-1">
								<FormLabel htmlFor='phone' className='block text-lg font-medium leading-none text-gray-700'>Numer telefonu</FormLabel>
								<Input
									id='phone'
									name='phone'
									color='primary'
									onChange={handleChange}
									value={form.phone}
									placeholder={'Numer telefonu'}
								/>
							</FormControl>
						</div>
						<div className='md:grid md:grid-cols-2 gap-2'>
							<FormControl className="text-sm mt-2 py-1">
								<FormLabel htmlFor='personalIdNumber' className='block text-lg font-medium leading-none text-gray-700'>Numer Dowodu</FormLabel>
								<Input
									id='personalIdNumber'
									name='personalIdNumber'
									color='primary'
									onChange={handleChange}
									value={form.personalIdNumber}
									placeholder={'Numer dowodu'}
								/>
							</FormControl>
							<FormControl className="text-sm mt-2 py-1">
								<FormLabel htmlFor='personalIdVerifiedBy' className='block text-lg font-medium leading-none text-gray-700'>Dowód wydany przez:</FormLabel>
								<Input
									id='personalIdVerifiedBy'
									name='personalIdVerifiedBy'
									color='primary'
									onChange={handleChange}
									value={form.personalIdVerifiedBy}
									placeholder={'Wydany przez'}
								/>
							</FormControl>
						</div>
					</div>
				</div>
				<div className='w-full flex justify-center items-center p-2 shadow-lg mb-3 rounded-md bg-white'>
					<Button
						color={'primary'}
						onClick={generate}
						size={'lg'}
					>
						Generuj
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Deal