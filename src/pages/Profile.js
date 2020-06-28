import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, replaceWatchlist, removeItem } from '../components/reducers/user'
import { capitalizeFirstLetter } from '../utils/StringUtils'
import { Link } from 'react-router-dom'
import layingPlaceholder from '../images/placeholderL.png'

export const Profile = ({ loggedIn, setLoggedIn }) => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user.login.userName)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`https://final-project-db-jennifer.herokuapp.com/users/${userId}/watchlist`, {
      method: "GET",
      headers: {
        "Authorization": `${accessToken}`
      }
    })
      .then(res => res.json())
      .then(json => {
        const sortedList = json.watchlist.reverse()
        dispatch(replaceWatchlist(sortedList))
        setList(sortedList)
      })
  }, [])

  const handleLogOut = () => {
    dispatch(logout(setLoggedIn))
  }

  if (!loggedIn || userId === null || userId === null || accessToken === null) {
    return (
      <div>
        Please sign in to access your profile!
      </div>
    )
  } else {
    return (
      <>
        <section class="welcome-container">
          <div className="welcome">

            Welcome {capitalizeFirstLetter(userName)}! 🍿

            {list.length === 0 ?
              <h6>Your watchlist is empty. Add your favourite movies and keep track of the movies you want to see but haven't seen yet! </h6>
              :
              <h6>This is your watchlist. Add more of your favourite movies and keep track of the movies you want to see but haven't seen yet! </h6>
            }
          </div>

          <section className="watchlist-container">

            {list.map(item => (
              <>
                <section className="watch-item" key={item.showId}>

                  <Link className="movie-link" to={`/movie/${item.showId}`}>

                    {item.poster === undefined || item.poster === null ?

                      <img className="movie-image"
                        alt={item.title}
                        src={layingPlaceholder}
                      >
                      </img>
                      :
                      <img className="movie-image"
                        alt={item.title}
                        src={`https://image.tmdb.org/t/p/w342/${item.poster}`}
                      >
                      </img>
                    }
                    <div className="right-container">
                      <h5 className="movie-title">
                        {item.title}
                        <span className="year">
                          &#40;{item.year.slice(0, 4)}&#41;
                        </span>
                      </h5>
                      <p className="overview">{item.overview}</p>

                    </div>
                  </Link>

                  <button className="remove-button" onClick={() => dispatch(removeItem(item.showId, setList, userId, accessToken))}>REMOVE</button>
                </section>

              </>
            ))}
          </section>
          <div >
            <button className="logout" onClick={() => handleLogOut()}>LOG OUT</button>
          </div>
        </section >
      </>
    )
  }
}

