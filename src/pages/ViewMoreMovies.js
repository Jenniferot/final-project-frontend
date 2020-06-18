import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WatchlistButton } from '../components/WatchlistButton'
import { Pagination } from '../components/Pagination'

export const ViewMoreMovies = ({ API_KEY, fetchlink, fetchtitle, moviePlaceholder, loggedIn }) => {

  const params = useParams()
  const genreId = params.id
  const genreName = params.name
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState()

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let URL = `${fetchlink}${page}`

  if (genreId) {
    fetchtitle = genreName
    URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
  }

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        setAllPages(res.total_pages)
        setMovies(res.results)
      })
  }, [fetchlink])

  return (
    <section>
      <h3>{capitalizeFirstLetter(fetchtitle)}</h3>
      <div className="movie-wrapper-container">
        {movies.map(item => {

          let src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

          if (item.poster_path == null || item.poster_path === undefined) {
            src = moviePlaceholder
          }
          return (
            <div className="movie-wrapper" key={item.id}>
              <Link className="movie-link" to={`/movie/${item.id}`}>
                <img 
                  className="movie-image"
                  src={src}>
                </img>

                <div className='movie-details'>
                
                  {loggedIn &&
                    < WatchlistButton item={item} />
                  }

                  <h5>
                    {item.title}
                  </h5>

                  <p>
                    Release {item.release_date}
                  </p>

                </div>
              </Link>
            </div>
          )
        })}

        < Pagination page={page} setPage={setPage} allPages={allPages} movies={movies} setMovies={setMovies} URL={URL} />

      </div>

    </section>

  )
}