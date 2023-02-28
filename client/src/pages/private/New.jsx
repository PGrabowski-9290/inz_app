import { Button, Checkbox, cx, FormControl, FormLabel, Input, Select, Textarea } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddFunctionalities from '../../components/newOffert/AddFunctionalities';
import AddPhoto from '../../components/newOffert/AddPhoto';
import ModelsSelectDynamic from "../../components/search/ModelsSelectDynamic";
import { carBrands, carCategories, drive, fuels, transmission, years } from "../../enums";
import useAuth from '../../hooks/useAuth';
import axiosPrivate from '../../utils/apiPrivate';
import BackButton from "../../components/BackButton";
const New = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    make: "",
    year: "",
    model: "",
    category: "",
    carColor: "",
    carFuelType: "",
    carPower: "",
    carEngCapacity: "",
    carDrive: "",
    carTrans: "",
    carGears: "",
    carDoors: "",
    carNumberPlate: "",
    functionalities: [],
    vin: "",
    odometer: "",
    salon: "",
    photos: [],
    isActive: true
  })
  const [salonsList, setSalonsList] = useState()

  async function loadSalonsData () {
    try {
      const result = await axiosPrivate(auth.accessToken).get('/salons/')
      console.log(result)
      setSalonsList(result?.data.data)
    }catch(err) {
      console.log(err.response.data.message)
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  } 

  function handleNumberChange(e) {
    const pattern = /^\d+[.,]?(\d{1,2})?$/;
    
    if (e.target.value === '' || pattern.test(e.target.value)) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.replace(',', '.')
      })
    }
  }

  function handleChecked(e) {
    setFormData({
      ...formData,
      isActive: e.target.checked
    })
  }

  async function handleSend() {
    try{
      let form = new FormData()

      for (const [key, value] of Object.entries(formData)) {
        if (Array.isArray(value)){
          value.forEach(v => form.append(key, v))
        }else{
          form.append(key, value);
        }
      }
      
      const result = await axiosPrivate(auth.accessToken).post('/offerts/new',
        form,
        {headers: { 'Content-Type': 'multipart/form-data' }}
      )
      if ( result.status === 200 ) {
        navigate('/a/offerts/details', {state: {id: result.data.id}, replace: true})
      }
    }catch (error){
      console.error(error)
    }
  }

  useEffect(()=> {
    loadSalonsData()
  }, [])

  return (
    <div className="w-full flex justify-center">
      <div className='w-full max-w-4xl'>
        <div className='p-2 shadow-lg mb-3 rounded-md bg-white flex justify-between items-center'>
          <div>
            <BackButton path={location.state?.locationTo}></BackButton>
          </div>
          <div>
            <FormControl className='text-lg flex justify-center md:justify-end items-end'>
              <div className='flex gap-4 justify-center'>
                <Checkbox checked={formData.isActive} onChange={handleChecked}>Aktywna</Checkbox>
                <Button onClick={handleSend} >Dodaj</Button>
              </div>
            </FormControl>
          </div>
        </div>
        <div className='p-2 shadow-lg rounded-md bg-white flex flex-col gap-2'>
          <div>
            <h1 className='text-center text-2xl text-gray-600 font-semibold'>Nowa Oferta</h1>
            <hr className='mt-2'></hr>
          </div>
          <div className='flex flex-col'>
            <FormControl className="text-sm mt-2 py-1">
              <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Salon</FormLabel>
              <Select
                size='lg'
                id="salon" 
                name="salon"
                value={formData.salon}
                onChange={handleChange}
              >
                <option value={""}>Wszystkie salony</option>
                {salonsList?.map((item)=>(
                  <option key={item._id} value={item._id}>{item.location.city}{" "}{item.location.street}</option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-600 text-xl">Dane pojazdu</h3>

            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
              <FormControl className="text-sm mt-2 md:m-0 py-1">
                <FormLabel className='block text-sm font-medium leading-none text-gray-700'>VIN</FormLabel>
                <Input 
                  size="lg"
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl className="text-sm mt-2 md:m-0 py-1">
                <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Numer rejestracji</FormLabel>
                <Input 
                  size="lg"
                  id="carNumberPlate"
                  name="carNumberPlate"
                  value={formData.carNumberPlate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl className="text-sm mt-2 md:m-0 py-1">
                <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Rok produkcji</FormLabel>
                <Select 
                  size="lg"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Rok produkcji"
                  className={cx(
                    (formData.year !== "" ? "text-black" : "text-gray-500") 
                  )}
                >
                  {years.map((item) => {
                      return (
                      <option 
                        key={item} 
                        value={item}
                      >
                        {item}
                      </option>)
                    })}
                </Select>
              </FormControl>

              <FormControl className="text-sm mt-2 md:m-0 py-1">
                <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Marka</FormLabel>
                <Select 
                  size="lg"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  placeholder="Marka pojazdu"
                  className={cx(
                    (formData.make !== "" ? "text-black" : "text-gray-500") 
                  )}
                >
                  {carBrands.map((item) => {
                      return (
                      <option 
                        key={item.value} 
                        value={item.value}
                      >
                        {item.name}
                      </option>)
                    })}
                </Select>
              </FormControl>

              <FormControl className="text-sm mt-2 md:m-0 py-1">
                <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Typ nadwozia</FormLabel>
                <Select 
                  size="lg"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder={"Typ nadwozia"}
                  className={cx(
                    (formData.category !== "" ? "text-black" : "text-gray-500") 
                  )}
                >
                  {carCategories.map( (item) => { 
                    return ( <option key={item.value} value={item.value}>{item.name}</option> )
                  })
                  }
                </Select>
              </FormControl>

              <ModelsSelectDynamic formData={formData} setFormData={setFormData} size="lg"/>

              <FormControl className="text-sm mt-2 md:m-0 py-1">
                <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Stan Licznika</FormLabel>
                <Input.Group size="lg">
                  <Input 
                    size="lg"
                    id="odometer"
                    name="odometer"
                    value={formData.odometer}
                    onChange={handleNumberChange}
                    placeholder="0"
                  />
                  <Input.RightAddon children="km"/>
                </Input.Group>
              </FormControl>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-gray-600 text-xl">Szczegółowe dane pojazdu</h3>
              <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Moc pojazdu</FormLabel>
                  <Input.Group size="lg">
                    <Input 
                      size="lg"
                      id="carPower"
                      name="carPower"
                      value={formData.carPower}
                      onChange={handleNumberChange}
                      placeholder="0"
                    />
                    <Input.RightAddon children="KM"/>
                  </Input.Group>
                </FormControl>

                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Pojemność silnika</FormLabel>
                  <Input.Group size="lg">
                    <Input 
                      size="lg"
                      id="carEngCapacity"
                      name="carEngCapacity"
                      value={formData.carEngCapacity}
                      onChange={handleNumberChange}
                      placeholder="Pojemność silnika"
                    />
                    <Input.RightAddon children="cm^3"/>
                  </Input.Group>
                </FormControl>

                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Rodzaj paliwa</FormLabel>
                  <Select 
                    size="lg"
                    id="carFuelType"
                    name="carFuelType"
                    value={formData.carFuelType}
                    onChange={handleChange}
                    placeholder="Rodzaj paliwa"
                    className={cx(
                      (formData.carFuelType !== "" ? "text-black" : "text-gray-500") 
                    )}
                  >

                    {fuels.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      )
                    )}

                  </Select>
                </FormControl>
              </div>

              <div className="md:grid md:grid-cols-3 md:gap-4">

                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Rodzaj napędu</FormLabel>
                  <Select 
                    size="lg"
                    id="carDrive"
                    name="carDrive"
                    value={formData.carDrive}
                    onChange={handleChange}
                    placeholder="Typ"
                    className={cx(
                      (formData.carDrive !== "" ? "text-black" : "text-gray-500") 
                    )}
                  >

                    {drive.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      )
                    )}

                  </Select>
                </FormControl>

                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Rodzaj skrzyni biegów</FormLabel>
                  <Select 
                    size="lg"
                    id="carTrans"
                    name="carTrans"
                    value={formData.carTrans}
                    onChange={handleChange}
                    placeholder="Typ"
                    className={cx(
                      (formData.carTrans !== "" ? "text-black" : "text-gray-500") 
                    )}
                  >

                    {transmission.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      )
                    )}

                  </Select>
                </FormControl>

                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Ilość biegów</FormLabel>
                  <Input
                    size="lg"
                    id="carGears"
                    name="carGears"
                    value={formData.carGears}
                    onChange={handleNumberChange}
                    placeholder={"0"}    
                  />
                </FormControl>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-4">
                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Ilość drzwi</FormLabel>
                  <Input
                    size="lg"
                    id="carDoors"
                    name="carDoors"
                    value={formData.carDoors}
                    onChange={handleNumberChange}
                    placeholder={"0"}    
                  />
                </FormControl>

                <FormControl className="text-sm mt-2 md:m-0 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Kolor pojazdu</FormLabel>
                  <Input
                    size="lg"
                    id="carColor"
                    name="carColor"
                    value={formData.carColor}
                    onChange={handleChange}
                    placeholder={"Kolor"}    
                  />
                </FormControl>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-gray-600 text-xl">Dodatkowe funkcje</h3>
              
              <AddFunctionalities form={formData} setForm={setFormData} />
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-600 text-xl">Zdjęcia podglądowe</h3>
              <p className="text-sm text-gray-400">Maksymalnie 5 zdjęć</p>
              <div className='w-full'> 
                <AddPhoto form={formData} setForm={setFormData}/>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-gray-600 text-xl">Dane oferty</h3>
              <FormControl id='title' className='text-lg mt-2 py-1'>
                <FormLabel className='block text-base font-medium leading-none text-gray-500'>Tytuł</FormLabel>
                <Input
                  size='lg'
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Tytuł"
                />
              </FormControl>
              
              <FormControl id='title' className='text-lg mt-2 py-1'>
                <FormLabel className='block text-base font-medium leading-none text-gray-500'>Opis</FormLabel>
                <Textarea
                  size='lg'
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Opis"
                />
              </FormControl>

              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
                <FormControl id='title' className='text-lg mt-2 py-1'>
                  <FormLabel className='block text-base font-medium leading-none text-gray-500'>Cena</FormLabel>
                  <Input.Group size="lg">
                    <Input
                      size='lg'
                      id='price'
                      name='price'
                      value={formData.price}
                      onChange={handleNumberChange}
                      placeholder="Cena"
                    />
                    <Input.RightAddon children="zł" />
                  </Input.Group>
                </FormControl>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default New