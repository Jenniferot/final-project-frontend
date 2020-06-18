import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../components/reducers/user'

export const Profile = ({ loggedIn, setLoggedIn }) => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user.login.userName)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}/watchlist`, {
      method: "GET",
      headers: {
        "Authorization": `${accessToken}`
      }
    })
      .then(res => res.json())
      .then(json => {
        setList(json.watchlist)
        //.then(watchlist => {
        console.log(json.watchlist)
      })
  }, [])


  const removeItem = (showId) => {

    fetch(`http://localhost:8080/users/${userId}/watchlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${accessToken}`
      },
      body: JSON.stringify({
        "showId": showId
      })
    })
      .then(res => res.json())
      .then(json => {
        setList(json.watchlist)
      })
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
            Welcome {capitalizeFirstLetter(userName)}!
          </div>
          <h6>Here is your watchlist. Which are your favourite movies? Keep track of the movies you want to see but haven't seen yet! </h6>

          {list.map((item) => (

            <section className="watch-list-container" key={item.showId}>
              <section className="watch-item">
                <div className="left-container">{item.title}

                  <button className="remove-button" onClick={() => removeItem(item.showId)}>REMOVE</button>
                </div>
                <div className="movie-image">
                  <img
                    draggable={false}
                    alt={item.title}

                    src={`https://image.tmdb.org/t/p/w342/${item.poster}`}
                  >
                  </img>
                </div>
              </section>
            </section>
          ))}

          < div className="logout" >
            <button onClick={() => handleLogOut()}>LOG OUT</button>
          </div>

        </section>
      </>
    )
  }
}
