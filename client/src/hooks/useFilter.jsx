import { useContext } from 'react'
import FilterContext from '../context/FilterProvider'

const useFilter = () => {
  return useContext(FilterContext)
}

export default useFilter