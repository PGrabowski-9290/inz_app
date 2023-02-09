import { FormControl, FormLabel, Select } from "@vechaiui/react";
import React, { useEffect, useState } from 'react';
import axiosPublic from '../../utils/publicApi';

const ModelsSelectDynamic = ({formData,setFormData, size="md"}) => {
  const [list, setList] = useState([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handle (e) {
    setFormData({
      ...formData,
      model: e.target.value
    })
  }

  async function loadList() {
    try{
      if ( formData.make === '' ) {
        setFormData({
          ...formData,
          model: ""
        })
        return setSuccess(false)
      }
      
      setLoading(true)

      const body = {
        make: formData.make,
        year: formData.year,
        category: formData.category
      }

      const result = await axiosPublic.post('/models',
      JSON.stringify(body)
      )

      if ( result.status === 200 ) {
        setSuccess(true)
        setList(result.data.list)
        setLoading(false)
      }
    }catch(err){
      console.log(err.response.data.message)
    }
  }

  useEffect(() => {
    loadList()
  }, [formData.make, formData.year, formData.category])

  return (
    <>
      <FormControl className="text-sm mt-2 md:m-0 py-1" disabled={!success || loading}>
        <FormLabel className='block text-sm font-medium leading-none text-gray-700'>Model</FormLabel>
        <Select
          size={size}
          color='indigo'
          id="model"
          name="model"
          value={formData.model}
          onChange={handle}
        >
          <option value={""}>{loading ? "Loading..." : "Wybierz"}</option>
          {list?.map((item)=>(
            <option key={item} value={item}>{item}</option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default ModelsSelectDynamic