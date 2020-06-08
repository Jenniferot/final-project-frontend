import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageSlider } from '../components/ImageSlider'
import { RightArrow } from '../components/RightArrow'

// import actorPlaceholder from '../images/phil-desforges-oQd5dwDWu_8-unsplash.jpg'
// import moviePlaceholder from '../images/elijah-flores-44se2xSCo00-unsplash.jpg'

export const MovieSlider = ({ fetchtitle, fetchlink, placeholder }) => {

  const [movies, setMovies] = useState([])
  const [active, setActive] = useState(false)

  const addToList = (event) => {
    event.preventDefault()
    //Add to redux/reducers
    //fetch (put) to users/:id/watchlist
    //header Authorization: accesstoken
    // body: "title": "movietitle",
    // showId: "movieId"
    //change color of button if added to watchlist?
  }

  useEffect(() => {
    fetch(fetchlink)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results)
      })
  }, [])

  return (
    <>
      {movies.length > 0 &&
        <h4>{fetchtitle}</h4>}

      <ImageSlider>
        {movies.map(movie => {

          let src = `https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`

          if (movie.backdrop_path == null || movie.backdrop_path === undefined) {
            src = placeholder
          }
          return (
            <div className="movie-wrapper" key={movie.id}>
              <Link className="movie-link" to={`/movie/${movie.id}`}>
                <img
                  className="movie-image"
                  draggable={false}
                  alt={movie.original_title}
                  style={{ width: "100%" }}
                  src={src}
                >
                </img>

                <div className='movie-details'>
                  <div>
                    <button
                      onMouseOver={event => setActive(!active)}
                      onMouseOut={event => setActive(!active)}
                      onClick={event => addToList(event)}
                    >
                      + {active && "Add to watchlist"}
                    </button>
                    <h5>
                      {movie.original_title}
                    </h5>
                    <p>
                      Released {movie.release_date}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}

      </ImageSlider >

    </>
  )
}