import React from 'react'
import config from '../config.json'

const HomeOffertsSlider = ({list}) => {

  function open(id) {
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
              <div className='flex w-full flex-col bg-white'>
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


  // return (
  //   <div className='flex items-center justify-center overflow-hidden'> 
  //     <div className='flex flex-row flex-nowrap px-2 py-3 sm:w-11/12 justify-start'>

        
  //     {list?.map((item)=> {
  //         return (
  //           <div key={item._id} className='bg-white rounded overflow-hidden shadow-lg cursor-pointer w-full max-w-sm sm:w-80' onClick={()=>{open(item._id)}}>
  //             <img className='w-full' src={config.SERVER_API_URL+'/'+item?.gallery[0]} alt={"car img "}></img>
  //             <div className='px-6 py-4'>
  //               <p className='font-bold text-xl mb-4'>{item?.title}</p>
  //               <div className='flex gap-2 flex-wrap mb-4 justify-start'>
  //                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.engine.power + ' KM'}</span>
  //                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.engine.capacity + ' ' + item?.car.engine.fuelType}</span>
  //                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.year}</span>
  //                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>{item?.car.odometer}</span>
  //               </div>
  //               <p className='font-bold text-xl text-violet-700'>{(item?.price * 1 ).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}<span className='text-sm ml-1'>PLN</span></p>
  //             </div>
  //           </div>)
  //         })
  //       }


  //     </div>
  //   </div>
  // )
}

export default HomeOffertsSlider