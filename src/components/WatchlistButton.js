import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWatchlist } from '../components/reducers/user'
import checkmark from '../images/white_checkmark.png'

export const WatchlistButton = ({ item }) => {

  const dispatch = useDispatch()
  const watchlist = useSelector((store) => store.user.watchlist)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const [added, setAdded] = useState(false)
  const [active, setActive] = useState(false)


  useEffect(() => {
    watchlist.map(listItem => {
      if (listItem.showId === item.id) {
        setAdded(true)
      }
    })
  }, [])

  const handleClick = async (event, title, id, poster, overview, year, country) => {
    event.preventDefault()
    dispatch(addToWatchlist(title, id, poster, overview, year))
    setAdded(true)

    const response = await fetch(`https://final-project-db-jennifer.herokuapp.com/users/${userId}/watchlist`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${accessToken}`
      },
      body: JSON.stringify({
        "title": title,
        "showId": id,
        "poster": poster,
        "overview": overview,
        "year": year,
        "country": country
      })
    })

    const JSON_RES = await response.json()
    console.log("JSON", JSON_RES)
  }

  return (
    <>
      {!added &&
        <button
          onMouseOver={() => setActive(true)}
          onMouseOut={() => setActive(false)}
          onClick={(event) => handleClick(event, item.title, item.id, item.backdrop_path, item.overview, item.release_date, item.production_countries)}
        >
          {active && "Add to watchlist"} +
        </button>
      }

      {added &&
        <button
          className={`${added ? "added" : ""}`}
          onMouseOver={() => setActive(true)}
          onMouseOut={() => setActive(false)}
        >

          {active && "Added to watchlist "}
          <img className="added-button" src={checkmark} />

        </button>
      }
    </>
  )
}
