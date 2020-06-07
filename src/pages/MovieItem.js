import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MovieSlider } from '../components/MovieSlider'
import { ImageSlider } from '../components/ImageSlider'
import actorPlaceholder from '../images/phil-desforges-oQd5dwDWu_8-unsplash.jpg'
import moviePlaceholder from '../images/elijah-flores-44se2xSCo00-unsplash.jpg'


export const MovieItem = ({ API_KEY }) => {

  const params = useParams()
  const movieId = params.id
  // const movieId = "419704"
  const URL_MOVIE = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  const URL_CAST = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  const URL_SIMILARMOVIES = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`
  
  const [movie, setMovie] = useState([])
  const [cast, setCast] = useState([])
  const [genre, setGenre] = useState([])
  const [loading, setLoading] = useState(false)

  console.log(genre.map(genre => genre.name).join(", "))
 
  useEffect(() => {
    setLoading(true)
    fetch(URL_MOVIE)
      .then(res => res.json())
      .then(json => {
        setMovie(json)
        setGenre(json.genres)
      })

      fetch(URL_CAST)
      .then(res => res.json())
      .then(json => {
        setCast(json.cast)
        setLoading(false)
      })
  }, [movieId])

  if (!movie || loading) {
    return (
      <div>
        loading
      </div>
    )
  } else {
    return (
      <section className="movie-item">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}>
        </img>

      <h2>
        {movie.original_title}
      </h2>

      <div>
        {movie.overview}
      </div>

      <div className="movie-genre">
        {genre.map((item, index) => (
            <>
            <Link to={`/genres/${item.id}`}>
              {item.name}
            </Link>
              <span>
                {(genre.length-1 > index) ? ", " : ""}
              </span>
            </>
        ))}
      </div>

      <ImageSlider>
        {cast.slice(0, 10).map(actor => {
            
          let src = `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
   
          if (actor.profile_path == null || actor.profile_path === undefined ) {
            src = actorPlaceholder
          } 
         
          return (
            <div className="movie-wrapper">
              <Link to={`/actor/${actor.id}`}>
                <img 
                  className="movie-image"
                  style={{height: "470px"}}
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

      < MovieSlider fetchtitle="Similar movies:" fetchlink={URL_SIMILARMOVIES} placeholder={moviePlaceholder}/>

      </section>
    )
  }
}