import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageSlider } from '../components/ImageSlider'
import { WatchlistButton } from '../components/WatchlistButton'
import { RightArrow } from '../components/RightArrow'

export const MovieSlider = ({ fetchtitle, titlelink, fetchlink, placeholder, imageOrientation, loggedIn }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(fetchlink)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results)
      })
  }, [fetchlink])

  return (
    <>
      <div className="movie-slider-title-container">
        {movies.length > 0 &&
          <Link to={titlelink}>
            <h3 className="image-slider-title">{fetchtitle}</h3>
            <RightArrow />
          </Link>
        }
      </div>
      <ImageSlider>
        {movies.map(movie => {

          let imageSrc;

          if (imageOrientation === "standing") {
            imageSrc = movie.poster_path
          } else {
            imageSrc = movie.backdrop_path
          }

          let src = `https://image.tmdb.org/t/p/w342/${imageSrc}`

          if (imageSrc == null || imageSrc === undefined) {
            src = placeholder
          }

          return (
            <div className="movie-wrapper" key={movie.id}>
              <Link className="movie-link" to={`/movie/${movie.id}`}>
                <img
                  className="movie-image"
                  draggable={false}
                  alt={movie.title}
                  style={{ width: "100%" }}
                  src={src}
                >
                </img>

                <div className='movie-details'>

                  {loggedIn &&
                    < WatchlistButton item={movie} />
                  }

                  <h5>
                    {movie.title}
                  </h5>

                  <p>
                    Release {movie.release_date}
                  </p>


                </div>
              </Link>
            </div>
          )
        })}

      </ImageSlider >

    </>
  )
}