import { FormControl, FormLabel, Input, Select } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import { carBrands } from "../../enums/carBrands";
import { carCategories } from '../../enums/carsCategories';
import axios from '../../utils/api';



const MainSearch = ({ filters, setFilters }) => {
  const [formData, setFormData] = useState({
    salons: "",
    make: "",
    year: "",
    model: "",
    fuel: "",
    drive: "",
    category: carCategories[0].value,
    transsmison: ""
  });
  const [salonsList, setSalonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSalonsData = async () => {
    try {
      const result = await axios.get('/salons/')
      setSalonsList(result?.data.data)
      setIsLoading(false)
    }catch(err) {
      console.log(err.response.data.message)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    loadSalonsData();
    console.log(carCategories)
    console.log(formData)
  },[])

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded w-full px-2 py-6 sm:w-2/3'>
        <p className='focus:outline-none text-xl font-extrabold leading-6 text-gray-800 text-center sm:text-center px-6'>Wyszukiwarka</p>
        <hr className='my-2'/>
        <div>
          <div>
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
            <div>
              <div>
                <FormControl>
                  <FormLabel>Typ nadwozia</FormLabel>
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
                <FormControl>
                  <FormLabel>Marka pojazdu</FormLabel>
                  <Select
                    id='make'
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Marka pojazdu"
                    onFocus="this.size=8"
                    
                  >
                    {carBrands.map((item) => {
                      return (<option key={item.value} value={item.value}>{item.name}</option>)
                    })}
                  </Select>
                </FormControl>
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSearch