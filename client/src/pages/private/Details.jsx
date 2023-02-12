import { CheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import ContactForm from '../../components/ContactForm';
import GallerySlider from '../../components/offerts/GallerySlider';
import WatchButton from '../../components/offerts/WatchButton';
import OpenWindow from '../../components/OpenWindow';
import axios from "../../utils/publicApi";
 
const Details = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const offertId = location?.state?.id || null;
  const [data, setData] = useState()
  const [contactFormOpen, setContactFormOpen] = useState(false)


  useEffect( () => {
    async function fetchData(id) {
      try {
        const result = await axios.get(`/offerts/public/details/${id}`);
  
        if ( result.status === 200 ){
          setData(result.data.data)
        }
      } catch (error) {
        console.error("Błąd pobierania danych: ",error)
      }
    }
    
    if (offertId)
      fetchData(offertId)
    else
      navigate('/a/offerts', {replace: true})
  }, [navigate, offertId])

  function handleCloseContactForm() {
    setContactFormOpen(false)
  }
  
  function handleEdit(){
    navigate('/a/offerts/edit', {state: {id: data._id}, replace: true})
  }

  function handleGenerate(){
    navigate('/a/offerts/deal', {state: {id: data._id}, replace: true})
  }
  
  if (data === undefined)
    return (
      <div>Loading</div>
    )

  return (
    <div className='w-full'>
      <div className='flex flex-row mb-4 justify-between bg-white p-2 rounded-md shadow-lg'>
        <BackButton path="/a/offerts"/>
        <Button.Group attached>
          <Button onClick={handleGenerate}>Generuj Umowę</Button>
          <Button onClick={handleEdit}>Edytuj</Button>
        </Button.Group>
      </div>

      <div className='flex flex-col md:flex-row shadow-lg rounded-b-md mb-4 bg-white'>
        <div className='md:basis-2/3'>
          <GallerySlider items={data?.gallery} />
        </div>
        <div className='h-full md:basis-1/3 p-2 md:pl-4 md:flex md:flex-col md:content-between'>
          <div className='font-bold text-2xl'>
              {data.title}
            </div>
          <div className='flex flex-row-reverse justify-between space-y-0 md:space-y-4 md:flex-col md:justify-end py-3'>
            
            <div className='flex justify-end'>
              <WatchButton id={data._id}/>
            </div>
            <div className='text-right'>
              <p className='font-semibold text-xl text-indigo-700'>{(data?.price * 1 ).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}<span className='text-sm ml-1'>PLN</span></p>
            </div>
          </div>
          <div className='flex flex-row justify-between md:flex-col mt-2 items-end'>
            <div className='flex flex-col text-sm md:text-right'>
              <span className='text-gray-400'>W salonie: </span>
              <span className='text-gray-700'>{data.salons.location.zipCode+' '+data.salons.location.city+' '+data.salons.location.street}</span>
            </div>
            <div className='flex justify-end md:mt-3'>
              <Button
                className='cursor-pointer'
                color='indigo'
                variant='link'
                size='xl'
                onClick={()=>{setContactFormOpen(true)}}
              >
                Skontaktuj się
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Szczegóły */}
      <div className='pb-3 px-2 shadow-xl mb-4 bg-white'>
        <h2 className='font-semibold text-xl text-gray-700 mb-1'>Szczegóły</h2>
        <div className='flex flex-col md:flex-row md:space-x-16'>
          <div className='grid grid-cols-2 gap-x-3'>
            <div className='text-gray-500'>Kategoria</div>
            <div className='text-indigo-700'>{data.car.category}</div>

            <div className='text-gray-500'>Marka</div>
            <div className='text-indigo-700'>{data.car.make}</div>
            
            <div className='text-gray-500'>Model</div>
            <div className='text-indigo-700'>{data.car.model}</div>

            <div className='text-gray-500'>Rok produkcji</div>
            <div className='text-indigo-700'>{data.car.year}</div>

            <div className='text-gray-500'>Przebieg</div>
            <div className='text-indigo-700'>{data.car.odometer+' km'}</div>

            <div className='text-gray-500'>Kolor</div>
            <div className='text-indigo-700'>{data.car.color}</div>
            
            <div className='text-gray-500'>Ilość drzwi</div>
            <div className='text-indigo-700'>{data.car.doorsNumber}</div>
          </div>
          <div className='grid grid-cols-2 gap-x-3'>
            <div className='text-gray-500'>Moc silnika</div>
            <div className='text-indigo-700'>{data.car.engine.power+' KM'}</div>

            <div className='text-gray-500'>Rodzaj paliwa</div>
            <div className='text-indigo-700'>{data.car.engine.fuelType}</div>

            <div className='text-gray-500'>Pojemność skokowa</div>
            <div className='text-indigo-700'>{data.car.engine.capacity}</div>

            <div className='text-gray-500'>Rodzaj napędu</div>
            <div className='text-indigo-700'>{data.car.drive}</div>

            <div className='text-gray-500'>Skrzynia biegów</div>
            <div className='text-indigo-700'>{data.car.gears+' biegów, '+data.car.transmission}</div>

            <div className='text-gray-500'>Zarejestrowany</div>
            <div className='text-indigo-700'>{(data.car?.numberPlate)? "TAK": "NIE"}</div>
            
            <div className='text-gray-500'>VIN</div>
            <div className='text-indigo-700'>{data.car.vin}</div>
          </div>
        </div>
      </div>
      {/* Wyposażenie */}
      <div className='pb-3 px-2 shadow-xl mb-4 bg-white'>
        <h2 className='font-semibold text-xl text-gray-700 mb-2'>Wyposażenie</h2>
        <div className='flex flex-wrap gap-x-8'>
          
          {data.functionalities[0] !== undefined ? (
            data.functionalities.map((item, index) => {
              return (
                <div key={index} className='flex flex-row flex-nowrap content-end overflow-hidden bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold gray-700'>
                  <CheckIcon className='w-5 h-5 mr-2 text-indigo-700'/>
                  <span className='inline-block'>{item}</span>
                </div>
              )
            })
          ) : (
            <div className='text-gray-500'>Brak danych</div>
          )
        }

        </div>
      </div>
      {/* Opis */}
      <div className='pb-3 px-2 shadow-xl mb-4 bg-white'>
        <h2 className='font-semibold text-xl text-gray-700 mb-2'>Opis</h2>
        <div className='p-2 md:px-4 whitespace-pre-line' dangerouslySetInnerHTML={{__html: (data?.description || "Brak opisu").replaceAll('\\n','<br />')}}>
          
        </div>
      </div>
      <OpenWindow 
        open={contactFormOpen}
      >
        <ContactForm
            setTitle={data.title+', Ofert number: '+data.number}
            onSubmit={() => {setContactFormOpen(false)}}
            showControlBtn={true}
            onClose={handleCloseContactForm}
        />
      </OpenWindow>
    </div>
  )
}

export default Details