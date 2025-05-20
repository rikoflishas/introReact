import React from 'react'

const ImageCard = ( url, title ) => {
  return (
    <div className='image-container'>
        <img src={url} alt=''></img> </div>
  )
}

export default ImageCard