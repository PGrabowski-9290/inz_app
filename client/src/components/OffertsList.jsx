import React from 'react';
import OffertListElement from './OffertListElement';

const OffertsList = ({list}) => {

  return (
    <div className='mt-4'>
      <div className='px-4'>

        {list?.map( (item, index) => {
          return (
            <OffertListElement key={index} item={item}/>
          )})
        }

      </div>
    </div>
  )
}

export default OffertsList