import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { WatchlistButton } from '../components/WatchlistButton'
import { Pagination } from '../components/Pagination'
import { capitalizeFirstLetter } from '../utils/StringUtils'
import standingPlaceholder from '../images/placeholderS.png'
import { LoadingAnimation } from '../components/Loadinganimation/LoadingAnimation'

export const MovieSearchResults = ({ API_KEY, loggedIn }) => {

  const params = useParams()
  const searchValue = params.value
  const results = useSelector((store) => store.user.searchResults)
  const allPages = useSelector((store) => store.user.searchResultsAllPages)
  const [active, setActive] = useState(false)
  const [movies, setMovies] = useState(results)
  const [page, setPage] = useState(1)

  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&include_adult=false&page=${page}`

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        setMovies(res.results)
      })
  }, [URL])

  if (!movies) {
    return (
      < LoadingAnimation />
    )
  } else {
    return (
      <section>

        <h3>Search results for: {capitalizeFirstLetter(searchValue)}</h3>
        <div className="movie-wrapper-container">
          {movies.map(item => {

            let src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

            if (item.poster_path == null || item.poster_path === undefined) {
              src = standingPlaceholder
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
                      < WatchlistButton active={active} setActive={setActive} item={item} />
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
}