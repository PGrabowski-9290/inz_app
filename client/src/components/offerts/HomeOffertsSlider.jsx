import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';

const HomeOffertsSlider = ({list}) => {
  const navigate = useNavigate()
  function open(id) {
    navigate('offers/details', {state: {id: id}, replace: true})
    console.log(id)
  }


  return (
    <div className='carousel my-12 mx-auto '>
      <div
        className='carousel-container relative flex gap-2 overflow-x-scroll overflow-y-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 py-2'
      >

        {list?.map((item, index) => {
          
          return (
            <div 
              key={index} 
              onClick={()=>{open(item._id)}}
              className='relative basis-72 max-w-sm snap-start rounded shrink-0'
            >
              <div className='flex w-full flex-col bg-white cursor-pointer'>
                <img className='w-full rounded-t-2' src={config.SERVER_API_URL+'/'+item.gallery[0]} alt={item.title}></img>
                <div className='flex flex-col space-y-4 p-2'>
                  <h3 className='font-bold text-xl'>{item.title}</h3>
                  <div className='flex gap-2 flex-wrap mb-4 justify-start'>
                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.engine.power + ' KM'}</span>
                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.engine.capacity + ' ' + item?.car.engine.fuelType}</span>
                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.year}</span>
                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.odometer}</span>
                  </div>
                  <p className='font-bold text-xl text-violet-700'>{(item?.price * 1 ).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}<span className='text-sm ml-1'>PLN</span></p>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )

}

export default HomeOffertsSlider