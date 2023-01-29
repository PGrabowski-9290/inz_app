import { Button, FormControl, FormLabel, Select } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import { carBrands, carCategories, drive, fuels, transmission, years } from "../../enums/enums";
import axiosPublic from '../../utils/publicApi';
import ModelsSelectDynamic from './ModelsSelectDynamic.jsx';

const MainSearch = ({ filters, setFilters, onSearch = () => {console.error("onSearch Not Implemented")} }) => {
  const [formData, setFormData] = useState({
    salons: "",
    make: "",
    year: "",
    model: "",
    fuel: "",
    drive: "",
    category: "",
    transsmison: ""
  });
  const [salonsList, setSalonsList] = useState([]);

  async function loadSalonsData () {
    try {
      const result = await axiosPublic.get('/salons/')
      setSalonsList(result?.data.data)
    }catch(err) {
      console.log(err.response.data.message)
    }
  }

  async function handleChange (e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleClick () {
    setFilters(formData)
    onSearch()
  }

  useEffect(() => {
    loadSalonsData();
    console.log(carCategories)
    console.log(formData)
  },[])

  return (
    <div className='flex items-center justify-center overflow-hidden shrink-0'>
      <div className='bg-white shadow-lg rounded w-full px-2 py-3 sm:w-2/3'>
        <p className='focus:outline-none text-xl font-extrabold leading-6 text-gray-800 text-center sm:text-center px-6 '>Wyszukiwarka</p>
        <hr className='my-2'/>
        <div>
          <div className='px-2 flex flex-col'>
            <FormControl className="text-sm mt-2 py-1">
              <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Salon</FormLabel>
              <Select
                id="salons" 
                name="salons"
                value={formData.salons}
                onChange={handleChange}
              >
                <option value={""}>Wszystkie salony</option>
                {salonsList?.map((item)=>(
                  <option key={item._id} value={item._id}>{item.location.city}{" "}{item.location.street}</option>
                ))}
              </Select>
            </FormControl>
            <div className='flex flex-col md:flex-row md:align-items-stretch'>
              <div className='md:px-1 flex flex-col align-start content-start w-full sm:w-1/2'>
                <FormControl className="text-sm mt-2 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Typ nadwozia</FormLabel>
                  <Select 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder={"Typ nadwozia"}
                  >
                    {carCategories.map( (item) => { 
                      return ( <option key={item.value} value={item.value}>{item.name}</option> )
                    })
                    }
                  </Select>
                </FormControl>
                <FormControl className="text-sm mt-2 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Marka pojazdu</FormLabel>
                  <Select
                    id='make'
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Marka pojazdu"
                  >
                    {carBrands.map((item) => {
                      return (<option key={item.value} value={item.value}>{item.name}</option>)
                    })}
                  </Select>
                </FormControl>

                <ModelsSelectDynamic formData={formData} handle={handleChange}/>
              </div>
              <div className='md:px-1 flex flex-col align-start content-start w-full sm:w-1/2'>
                <FormControl className="text-sm mt-2 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Rok produkcji</FormLabel>
                  <Select
                    id='year'
                    name="year"
                    placeholder='Rok Produkcji'
                    value={formData.year}
                    onChange={handleChange}
                  >
                    {
                      years.map((item) => {
                        return (<option key={item} value={item}>{item}</option>)
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl className="text-sm mt-2 py-1">
                  <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Rodzaj paliwa</FormLabel>
                  <Select
                    id='fuel'
                    name="fuel"
                    placeholder='Rodzaj paliwa'
                    value={formData.fuel}
                    onChange={handleChange}
                  >
                    {
                      fuels.map((item) => {
                        return (<option key={item} value={item}>{item}</option>)
                      })
                    }
                  </Select>
                </FormControl>
                <div className='flex flex-col sm:flex-row sm:space-x-2 '>
                  <div className='w-full sm:w-1/2'>
                    <FormControl className="text-sm mt-2 py-1">
                      <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Skrzynia biegów</FormLabel>
                      <Select
                        id='transsmison'
                        name="transsmison"
                        placeholder='Typ'
                        value={formData.transsmison}
                        onChange={handleChange}
                      >
                        {
                          transmission.map((item) => {
                            return (<option key={item} value={item}>{item}</option>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </div>
                  <div className='w-full sm:w-1/2'>
                    <FormControl className="text-sm mt-2 py-1">
                      <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Rodzaj napędu</FormLabel>
                      <Select
                        id='drive'
                        name="drive"
                        placeholder='Rodzaj napędu'
                        value={formData.drive}
                        onChange={handleChange}
                      >
                        {
                          drive.map((item) => {
                            return (<option key={item} value={item}>{item}</option>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <hr className='mt-3'/>
            <FormControl className="text-sm mt-4 py-1 flex flex-row w-full justify-center align-items-center">
              <Button onClick={handleClick} size='xl' className='text-semibold'>Wyszukaj</Button>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSearch