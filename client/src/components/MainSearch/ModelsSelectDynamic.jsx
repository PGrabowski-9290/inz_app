import { FormControl, FormLabel, Select } from "@vechaiui/react";
import React, { useEffect, useState } from 'react';
import axiosPublic from '../../utils/api';

const ModelsSelectDynamic = ({formData,handle}) => {
  const [list, setList] = useState([])
  const [success, setSuccess] = useState(false)

  async function loadList() {
    try{
      if ( formData.make === '' ) {
        return setSuccess(false)
      }

      const body = {
        make: formData.make,
        year: formData.year,
        category: formData.category
      }
      console.log(body)
      const result = await axiosPublic.post('/models',
      JSON.stringify(body)
      )
      console.log(formData.make)
      if ( result.status === 200 ) {
        console.log("STATUS RESPONSE: ",result.status)
        setSuccess(true)
        setList(result.data.list)
      }
    }catch(err){
      console.log(err.response.data.message)
    }
  }

  useEffect(() => {
    loadList()
    console.log("---load data executed: models")
  }, [formData])

  return (
    <>
      <FormControl className="text-sm mt-2 py-1" disabled={!success}>
        <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Model</FormLabel>
        <Select
          id="model"
          name="model"
          value={formData.model}
          onChange={handle}
        >
          <option value={""}>Wybierz</option>
          {list?.map((item)=>(
            <option key={item} value={item}>{item}</option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default ModelsSelectDynamic