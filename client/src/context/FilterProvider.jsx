import { createContext, useState } from 'react'

const FilterContext = createContext({})

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    salons: "",
    make: "",
    year: "",
    model: "",
    fuel: "",
    drive: "",
    category: "",
    transsmison: "",
    offertNumber: "",
    isActive: true,
    isSold: false
  })


  return (
    <FilterContext.Provider value={{ filter, setFilter }} >
      { children }  
    </FilterContext.Provider>
  )
}

export default FilterContext