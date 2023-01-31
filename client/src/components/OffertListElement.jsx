import { MapPinIcon } from "@heroicons/react/20/solid";
import React from 'react';
import config from '../config.json';

const OffertListElement = ({item}) => {
  function onClickOpen (id) {
    console.log(id)
  }


  return (
    <div
      onClick={()=>{onClickOpen(item._id)}}
      className='my-6 flex flex-col md:flex-row justify-between rounded shadow-lg cursor-pointer'>
      <div className='flex flex-col md:flex-row md:space-x-2'>
        <img className='h-full w-full md:max-w-xs' alt={item.title} src={config.SERVER_API_URL+'/'+item.gallery[0]}></img>
        <div className='p-3'>
          <div>
            <h2 className='font-bold text-3xl mb-4'>
              {item.title}
            </h2>
            <div className='flex gap-2 flex-wrap mb-4 justify-start'>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.engine.power + ' KM'}</span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.engine.capacity + ' ' + item?.car.engine.fuelType}</span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.year}</span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{(item?.car.odometer * 1).toLocaleString('pl-PL', { minimumFractionDigits: 0 }) + ' km'}</span>
            </div>
            <div className='flex flex-row bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold gray-700'>
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span > {item?.salons}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-3'>
        <p className='font-bold text-xl text-violet-700'>{(item?.price * 1 ).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}<span className='text-sm ml-1'>PLN</span></p>
      </div>
    </div>
  )
}

export default OffertListElement