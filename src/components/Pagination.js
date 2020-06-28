import React, { useEffect } from 'react'

export const Pagination = ({ page, setPage, allPages, movies, setMovies, URL }) => {

  const showMoreMovies = (event) => {
    event.preventDefault()
    setPage(page + 1);

    fetch(URL)
      .then(res => res.json())
      .then(res => {
        const allMovies = movies.concat(res.results)
        setMovies(allMovies)
      })
  }

  return (
    <section className="pagination">
      {page < allPages &&
        <button onClick={(event) => showMoreMovies(event)}>
          Show more
        </button>
      }

      <p className="pagination-page-indicator">
        {page} / {allPages}
      </p>
    </section>
  )
}