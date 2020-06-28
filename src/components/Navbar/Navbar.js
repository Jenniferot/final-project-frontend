import React from 'react'
import { Link } from 'react-router-dom'
import { Searchbar } from './Searchbar'
import { HamburgerMenu } from './HamburgerMenu'
import { RandomMovieGenerator } from '../RandomMovieGenerator'
import { SigninLogin } from './SigninLogin'

export const Navbar = ({ loggedIn, API_KEY }) => {

  return (
    <>
      <div className="navbar">
        <div className="navleft">
          < HamburgerMenu API_KEY={API_KEY} loggedIn={loggedIn} />
          <div className="logo">
            <Link to="/">
              <h3><span>I</span><span className="find">FIND</span><span>MOVIES</span></h3>
            </Link>
          </div>
        </div>

        <div className="navright">

          < RandomMovieGenerator API_KEY={API_KEY} className="desktop-navbar-menu" />

          < Searchbar API_KEY={API_KEY} className="desktop-navbar-menu" />

          < SigninLogin loggedIn={loggedIn} className="navbar-signin-login" />
          {/* {!loggedIn &&
            <Link className="signin-container" to="/signin">
              <div className="signin">SIGN IN</div>
              <div className="right-arrow-container">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 438.5 438.5">
                  <path d="M29.4 329.3c19.6 33.6 46.2 60.2 79.8 79.8 33.6 19.6 70.3 29.4 110.1 29.4s76.5-9.8 110.1-29.4c33.6-19.6 60.2-46.2 79.8-79.8 19.6-33.6 29.4-70.3 29.4-110.1s-9.8-76.5-29.4-110.1c-19.6-33.6-46.2-60.2-79.8-79.8C295.7 9.8 259 0 219.3 0c-39.8 0-76.5 9.8-110.1 29.4C75.6 49 49 75.6 29.4 109.2 9.8 142.8 0 179.5 0 219.3c0 39.7 9.8 76.4 29.4 110zm120.5-197.7c-3.6-3.6-5.4-7.9-5.4-12.8s1.8-9.2 5.4-12.8L179 76.8c3.6-3.6 7.9-5.4 12.8-5.4 5 0 9.2 1.8 12.9 5.4l129.6 129.6c3.6 3.6 5.4 7.9 5.4 12.8s-1.8 9.2-5.4 12.8L204.7 361.7c-3.6 3.6-7.9 5.4-12.9 5.4-4.9 0-9.2-1.8-12.8-5.4l-29.1-29.1c-3.6-3.6-5.4-7.9-5.4-12.8s1.8-9.2 5.4-12.8l87.6-87.6-87.6-87.8z"></path>
                </svg>
              </div>
            </Link>
          }

          {loggedIn &&
            <Link className="signin-container" to="/profile">
              <section className="signin">
                {userName.toUpperCase()}
              </section>
              <div className="right-arrow-container">
                <UserImage className="user-image" />
              </div>
            </Link>
          } */}
        </div>

      </div>
    </>
  )
}

