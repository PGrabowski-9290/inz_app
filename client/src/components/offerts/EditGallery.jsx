import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, IconButton } from '@vechaiui/react';
import Carousel from 'nuka-carousel';
import React, { useEffect, useRef, useState } from 'react';
import noimage from '../../assets/noimage.png';
import config from "../../config.json";

const EditGalery = ({form, setForm}) => {
  const [files, setFile] = useState([])
  const [oldFiles, setOldFiles] = useState(form.oldPhotos)
  const input = useRef(null)
  const removePhotos = useRef([])

  function handleSelect(){
    input.current.click()
  }

  function handleChange(e) {
    let fileList = []

    for(let i = 0; i < e.target.files.length; i++) {
      fileList.push(e.target.files[i])
    }
    if (fileList.length>0){
      setFile([...files, e.target.files[0]])
    }
  }

  function handleRemove(id) {
    console.log(id)
    let result = files.filter((item, index) => index !== id )
    setFile(result)
  }

  function handleRemoveOld(id) {
    console.log(id)
    let result = oldFiles.filter((item, index) => {
      if (index !== id) {
        return true
      }
      removePhotos.current.push(item)
      return false
    } )
    setOldFiles(result)
  }

  useEffect(() => {
    setForm({
      ...form,
      photos: files,
      removePhotos: removePhotos.current,
    })
  }, [files, oldFiles])

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap gap-2'>
      <div className='flex flex-col justify-center sm:justify-start md:basis-1/4'>
        <input type="file" accept='image/*' id='photos' name='photos[]' onChange={handleChange} ref={input} style={{display: 'none'}}/>
        <Button size='xl' onClick={handleSelect}>Dodaj zdjęcie</Button>
        <div>
          <p className='text-center w-full mt-3 text-gray-600'>Wybrane zdjęcia:</p>
          <ul className='flex flex-col'>
            {
              oldFiles?.map((item, index) => {
                return (
                  <li key={index} className='inline-flex py-1'>
                    <IconButton onClick={() => handleRemoveOld(index)} variant='link'>
                      <TrashIcon className='text-indigo-600 w-5 h-5 mr-1'/>
                    </IconButton>
                    <span className='break-all'>{item.split("\\")[1]}</span>
                  </li>
                )
              })
            }
            {
              files?.map((item, index) => {
                return (
                  <li key={index} className='inline-flex py-1'>
                    <IconButton onClick={() => handleRemove(index)} variant='link'>
                      <TrashIcon className='text-indigo-600 w-5 h-5 mr-1'/>
                    </IconButton>
                    <span className='break-all'>{item.name}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className='md:basis-3/4 max-h-[436px] h-[436px]'>
        <Carousel
          wrapAround={true}
          cellAlign="center"
          className='max-h-[436px] h-[436px]'
        > 
          { (files.length === 0 && oldFiles.length === 0) && (
            <img src={noimage} alt="not found preview img"></img>
          )}

          {files?.map((file, index) => (
            <img key={index} className="object-cover" src={URL.createObjectURL(file)} alt="preview img"></img>
          ))
          }

          {
            oldFiles?.map((file, index) => (
              <img key={index} className="object-cover" src={config.SERVER_API_URL+'/'+file} alt="preview img"></img>
            ))
          }
        </Carousel>
      </div>
    </div>
  )
}

export default EditGalery