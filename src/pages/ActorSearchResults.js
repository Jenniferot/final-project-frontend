import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../utils/StringUtils'
import { Pagination } from '../components/Pagination'
import standingPlaceholder from '../images/placeholderS.png'
import { LoadingAnimation } from '../components/Loadinganimation/LoadingAnimation'

export const ActorSearchResults = ({ API_KEY }) => {

  const params = useParams()
  const searchValue = params.value
  const allPages = useSelector((store) => store.user.searchResultsAllPages)
  const [actors, setActors] = useState([])
  const [page, setPage] = useState(1)

  const URL = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${searchValue}&include_adult=false&page=${page}`

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        setActors(res.results)
      })
  }, [URL])

  if (!actors) {
    return (
      < LoadingAnimation />
    )
  } else {
    return (
      <section>

        <h3>Search results for actors: {capitalizeFirstLetter(searchValue)}</h3>
        <div className="movie-wrapper-container">
          {actors.map(item => {

            let src = `https://image.tmdb.org/t/p/w500/${item.profile_path}`

            if (item.profile_path == null || item.profile_path === undefined) {
              src = standingPlaceholder
            }
            return (
              <div className="movie-wrapper" key={item.id}>
                <Link className="movie-link" to={`/actor/${item.id}`}>
                  <img
                    className="movie-image"

                    src={src}>

                  </img>
                  <div className='movie-details'>

                    <h5>
                      {item.name}
                    </h5>

                    <p>
                      Known for: {item.known_for_department}
                    </p>
                  </div>
                </Link>
              </div>
            )
          })}

          < Pagination page={page} setPage={setPage} allPages={allPages} movies={actors} setMovies={setActors} URL={URL} />

        </div>
      </section>
    )
  }
}
