import Carousel from 'nuka-carousel'
import React from 'react'
import config from '../../config.json'

const GallerySlider = ({items}) => {
  return (
    <div>
      <Carousel>
        {
          items.map((item, index) => {
            return (
              <img key={index} src={config.SERVER_API_URL+'/'+item} alt='Gallery'></img>
            )
          })
        }
      </Carousel>
    </div>
  )
}

export default GallerySlider