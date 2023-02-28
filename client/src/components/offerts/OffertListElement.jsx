import { MapPinIcon } from "@heroicons/react/20/solid";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';
import { roles } from '../../enums';
import ProtectedRoleComponent from "../ProtectedRoleComponent";

const OffertListElement = ({item}) => {
  const navigate = useNavigate()


  function onClickOpen (id) {
    navigate('details', {state: {id: id}, replace: true})
  }


  return (
    <div
      onClick={()=>{onClickOpen(item._id)}}
      className='my-6 flex flex-col md:flex-row justify-between rounded shadow-lg cursor-pointer bg-white'>
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
              <span >{item?.salons.location.city+' '+item?.salons.location.street}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-3'>
        <p className='font-bold text-xl text-violet-700 text-right'>{(item?.price * 1 ).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}<span className='text-sm ml-1'>PLN</span></p>
        <div className="flex justify-between gap-2 text-sm">
          <span className="text-gray-400">{"Oferta nr. "+item?.number}</span>
          <ProtectedRoleComponent allowed={[roles.Admin, roles.User]} component={
            item?.isSold ? (
                <span className="font-bold text-red-500 text-right ">Sprzedane</span>
              ) :
              !item?.isActive ? <span className="font-bold text-red-500 text-right">Nie aktywne</span> :
                <span className="font-bold text-green-500 text-right">Aktywna</span>
          }/>
        </div>
      </div>
    </div>
  )
}

export default OffertListElement