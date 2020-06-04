import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { user, logout } from '../components/reducers/user'

export const Profile = ({ loggedIn, setLoggedIn }) => {
  const dispatch = useDispatch();

  const userName = useSelector((store) => store.user.login.userName)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)

  const handleClick = () => {
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
      <div>
        Welcome { userName }!

        <button onClick={handleClick}>Log out</button>
      </div>
    )
  }
 
}