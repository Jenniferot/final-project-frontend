import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserImage } from './UserImage'
import { RightArrow } from '../RightArrow'

 export const SigninLogin = ({loggedIn, className}) => {
  const userName = useSelector((store) => store.user.login.userName)

   return (
     <>
      {!loggedIn &&
        <Link className={`signin-container ${className}`} to="/signin">
            SIGN IN
            < RightArrow />
        </Link>
      }
    
      {loggedIn &&
        <Link className={`signin-container ${className}`} to="/profile">
          {userName.toUpperCase()}
          <div className="right-arrow-container">
            <UserImage className="user-image" />
          </div>
        </Link>
      }
    </>
   )
 }
 