import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const RandomMovieGenerator = ({ API_KEY, className }) => {
  const history = useHistory()
  const [genre, setGenre] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(res => {
        setGenre(res.genres)
      })
  }, [])

  const handleClick = async () => {

    const maxGenreValue = genre.length
    const randomGenreValue = Math.floor(Math.random() * maxGenreValue)
    const randomGenreId = genre[randomGenreValue].id

    const response_genres = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${randomGenreId}`)
    const json_genres = await response_genres.json()

    const maxPages = json_genres.total_pages
    const randomPage = Math.floor(Math.random() * maxPages + 1)

    const response_random_page = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${randomGenreId}&page=${randomPage}`)
    const json_random_page = await response_random_page.json()

    const totalResultsPerPage = json_random_page.results.length
    const randomMovieIndex = Math.floor(Math.random() * totalResultsPerPage)
    const randomMovieItem = json_random_page.results[randomMovieIndex]

    history.push(`/movie/${randomMovieItem.id}`)

  }
  return (
    <>
      <button 
        className={`random-button ${className ? className : ""}`}
        onClick={() => handleClick()}>RANDOMIZE FILM &nbsp;🎲</button>
    </>
  )
}