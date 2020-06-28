import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MovieSlider } from '../components/MovieSlider'
import { LoadingAnimation } from '../components/Loadinganimation/LoadingAnimation'
import { ImageSlider } from '../components/ImageSlider'
import layingPlaceholder from '../images/placeholderL.png'

export const ActorPage = ({ API_KEY, loggedIn }) => {

  const params = useParams()
  const actorId = params.id
  const URL_PAGE = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`
  const URL_IMAGES = `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${API_KEY}`
  const URL_SIMILARMOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=${actorId}`

  const [actor, setActor] = useState()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(actor)

  useEffect(() => {
    setLoading(true)
    fetch(URL_PAGE)
      .then(res => res.json())
      .then(json => {
        setActor(json)
      })

    fetch(URL_IMAGES)
      .then(res => res.json())
      .then(json => {
        setImages(json.profiles)
        setLoading(false)
      })
  }, [URL_IMAGES, URL_PAGE])

  if (!actor || loading) {
    return (
      < LoadingAnimation />
    )
  } else {
    return (
      <div className="actor-page-container">
        <section className="actor-top-container">

          <img src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}>
          </img>
          <div className="actor-info-container">
            <h2>{actor.name}</h2>
            
            {actor.birthday && 
              <>
                <h4>Born:</h4> 
                <p>
                  {actor.birthday}, {actor.place_of_birth}
                </p>
              </>
            }

            {actor.biography &&
              <section>
                <h4>Biography:</h4>
                <p>{actor.biography}</p>
              </section>
            }
          </div>
        </section>

        {images && images.length > 1 &&
          <div className="movie-slider-title-container no-hover-effect">
            <h3 className="image-slider-title-no-link">Images: </h3>
            <ImageSlider >
              {images.map(image => {
                return (
                  <div className="movie-wrapper">
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${image.file_path}`}
                      className="movie-image"
                    >
                    </img>
                  </div>
                )
              })
              }
            </ImageSlider>
          </div>
        }

        < MovieSlider fetchlink={URL_SIMILARMOVIES} fetchtitle="Also starring in:" placeholder={layingPlaceholder} loggedIn={loggedIn} />

      </div>
    )
  }
}