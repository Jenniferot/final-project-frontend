import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MovieSlider } from '../components/MovieSlider'
import { ImageSlider } from '../components/ImageSlider'
import { ThumbnailGallery } from '../components/MovieItem/ThumbnailGallery'
import { IMDBRatingPlugin } from '../components/MovieItem/IMDBRatingPlugin'
import standingPlaceholder from '../images/placeholderS.png'
import layingPlaceholder from '../images/placeholderL.png'
import { Review } from '../components/MovieItem/Review'
import { WatchlistButtonExtended } from '../components/MovieItem/WatchlistButtonExtended'

export const MovieItem = ({ API_KEY, loggedIn }) => {

  const params = useParams()
  const movieId = params.id
  const URL_MOVIE = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  const URL_CAST = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  const URL_SIMILARMOVIES = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`
  const URL_TRAILER = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  const URL_REVIEW = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  const URL_THUMB = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`

  const [movie, setMovie] = useState([])
  const [cast, setCast] = useState([])
  const [directors, setDirectors] = useState([])
  const [genre, setGenre] = useState([])
  const [productionCompany, setProductionCompany] = useState([])
  const [trailer, setTrailer] = useState([])
  const [thumbNails, setThumbNails] = useState([]);
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [productionCountry, setProductionCountry] = useState([])

  let src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`

  if (!movie.backdrop_path) {
    src = layingPlaceholder
  }

  useEffect(() => {
    setLoading(true)
    fetch(URL_MOVIE)
      .then(res => res.json())
      .then(json => {
        setMovie(json)
        setProductionCompany(json.production_companies)
        setGenre(json.genres)
        setProductionCountry(json.production_countries)
      })

    fetch(URL_CAST)
      .then(res => res.json())
      .then(json => {
        setCast(json.cast)
        json.crew.map(item => {
          if (item.job == "Director") {
            setDirectors(directors => [...directors, item.name])
          }
        })
      })

    fetch(URL_REVIEW)
      .then(res => res.json())
      .then(json => {
        setReviews(json.results)
      })

    fetch(URL_THUMB)
      .then(res => res.json())
      .then(json => {
        setThumbNails(json.backdrops)
      })

    fetch(URL_TRAILER)
      .then(res => res.json())
      .then(json => {
        setTrailer(json.results)
        setLoading(false)
      })
  }, [URL_MOVIE])

  if (!movie || loading) {
    return (
      <div>
        loading
      </div>
    )
  } else {
    return (

      <section className="movie-item">
        <section className="movie-overview-container">
          <section className="movie-image-container">

            {thumbNails.length > 2 ?
              < ThumbnailGallery
                thumbnailArray={thumbNails.slice(0, 10)}
                thumbnailDefault={thumbNails.map(item => item.file_path)[0]}
              />
              :
              <img
                className="movie-poster"
                src={src}>
              </img>
            }
          </section>

          <section className="movie-overview">
            <h2>
              {movie.title} <span className="thin">&#40;{movie.release_date}&#41;</span>
            </h2>

            {loggedIn &&
              < WatchlistButtonExtended item={movie} />
            }
            <h4 >Movie overview:</h4>

            <div>
              {movie.overview}
            </div>

            < IMDBRatingPlugin imdbId={movie.imdb_id} title={movie.title} rating={movie.vote_average} />

            <h4>Director:</h4>
            <div>
              {directors.map((item, index) => (
                <>
                  {item}
                  {directors.length - 1 > index && ", "}
                </>
              ))}
            </div>

            <h4>Produced by:</h4>
            <div>
              {productionCompany.map((company, index) => (
                <>
                  {company.name}
                  {productionCompany.length - 1 > index && ", "}
                </>
              ))}
            </div>

            <h4>Production country:</h4>
            <div>
              {productionCountry.map((country, index) => (
                <>
                  {country.name}
                  {productionCountry.length - 1 > index && ", "}
                </>
              ))}
            </div>

            <h4>Genre:</h4>
            <div className="movie-genre">
              {genre.map(item => (
                <>
                  <Link to={`/genres/${item.name}/${item.id}`}>
                    {item.name}
                  </Link>
                </>
              ))}
            </div>

          </section>
        </section>

        {
          trailer.map(item => {
            if (item.site === "YouTube") {
              return (
                <iframe
                  width="560" height="315"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                >
                </iframe>
              )
            }
          })[0]
        }

        {reviews.length > 0 &&
          <>
            <h4>Reviews:</h4>
            {reviews.slice(0, 3).map(review => (
              < Review review={review} />
            ))}
          </>
        }

        <h4 className="cast">Cast: </h4>

        <ImageSlider>

          {cast.slice(0, 10).map(actor => {

            let src = `https://image.tmdb.org/t/p/w300/${actor.profile_path}`

            if (actor.profile_path == null || actor.profile_path === undefined) {
              src = standingPlaceholder
            }

            return (
              <div className="movie-wrapper">
                <Link to={`/actor/${actor.id}`}>
                  <img
                    className="movie-image"
                    // style={{height: "470px"}}
                    src={src}
                  >
                  </img>
                  <div className="movie-details">
                    <div>
                      <h5>
                        {actor.name}
                      </h5>
                      <p>
                        as {actor.character}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </ImageSlider>

        < MovieSlider fetchtitle="Similar movies:" titlelink={`/similar-movies/${movie.id}`} fetchlink={URL_SIMILARMOVIES} placeholder={layingPlaceholder} loggedIn={loggedIn} />

      </section >
    )
  }
}