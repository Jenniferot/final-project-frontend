import React, { useState } from 'react'

export const ThumbnailGallery = ({ thumbnailArray, thumbnailDefault }) => {

  const [selectedFilePath, setSelectedFilePath] = useState(thumbnailDefault)
   
  return (

    <div className="thumbnail-gallery">
      <img 
        alt="large movie poster"
        className="thumbnail-gallery-display"
        src={`https://image.tmdb.org/t/p/original${selectedFilePath}`}
      >
      </img>

      <div className="thumbnail-gallery-thumbs">
      {thumbnailArray.map((item, index) => {
        return (    
            <img 
              key={index}
              alt="movie poster"
              style={item.file_path === selectedFilePath ? {opacity: 1, border: "0.5px solid darkgray"} : {opacity: 0.4}}
              src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
              onClick={() => setSelectedFilePath(item.file_path)}
            >
            </img>
        
        )
      })}
      </div>
    </div>

  )
}
