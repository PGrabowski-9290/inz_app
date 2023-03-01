import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { Button } from '@vechaiui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({path, state = undefined}) => {
  const navigate = useNavigate()

  function handle() {
    navigate(path, {state: state, replace: true})
  }

  return (
    <Button
      onClick={handle}
      leftIcon={<ArrowUturnLeftIcon className='w-4 h-4 mr-1'/>}
    >Wróć</Button>
  )
}

export default BackButton