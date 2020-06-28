import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RightArrow } from '../RightArrow'
import { RandomMovieGenerator } from '../RandomMovieGenerator'
import { Searchbar } from './Searchbar'
import { SigninLogin } from './SigninLogin'

export const HamburgerMenu = ({ API_KEY, loggedIn }) => {

  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setVisible(!visible)
  }

  const showMenu = () => {
    setShow(!show)
  }

  return (
    <>
      <div className={`hamburger-icon ${show ? "transform" : ""}`}
        onClick={() => showMenu()}>
        <div className="hamburger-div-1"></div>
        <div className="hamburger-div-2"></div>
        <div className="hamburger-div-3"></div>
      </div>
      <ul className={`hamburger-menu ${show ? "visible" : ""}`}>

        < SigninLogin loggedIn={loggedIn} className="hamburger-signin-login" />

        <NavLink exact to="/"> <li>Home</li></NavLink>
        <li className="genres" onClick={() => handleClick()}>Genres
          < RightArrow visible={visible} />
        </li>
        <div className={`hamburger-menu-genre-accordion ${visible ? "visible" : ""}`}>
          <NavLink className="genre" exact to="/genres"><p>All Genres</p></NavLink>
          <NavLink className="genre" exact to="/genres/Action/28"><p>Action</p></NavLink>
          <NavLink className="genre" exact to="/genres/Adventure/12"><p>Adventure</p></NavLink>
          <NavLink className="genre" exact to="/genres/Animation/16"><p>Animation</p></NavLink>
          <NavLink className="genre" exact to="/genres/Comedy/35"><p>Comedy</p></NavLink>
          <NavLink className="genre" exact to="/genres/Crime/80"><p>Crime</p></NavLink>
          <NavLink className="genre" exact to="/genres/Documentary/99"><p>Documentary</p></NavLink>
          <NavLink className="genre" exact to="/genres/Drama/18"><p>Drama</p></NavLink>
          <NavLink className="genre" exact to="/genres/Family/10751"><p>Family</p></NavLink>
          <NavLink className="genre" exact to="/genres/Fantasy/14"><p>Fantasy</p></NavLink>
          <NavLink className="genre" exact to="/genres/History/36"><p>History</p></NavLink>
          <NavLink className="genre" exact to="/genres/Horror/27"><p>Horror</p></NavLink>
          <NavLink className="genre" exact to="/genres/Music/10402"><p>Music</p></NavLink>
          <NavLink className="genre" exact to="/genres/Mystery/9648"><p>Mystery</p></NavLink>
          <NavLink className="genre" exact to="/genres/Romance/10749"><p>Romance</p></NavLink>
          <NavLink className="genre" exact to="/genres/Science%20Fiction/878"><p>Science Fiction</p></NavLink>
          <NavLink className="genre" exact to="/genres/Thriller/53"><p>Thriller</p></NavLink>
          <NavLink className="genre" exact to="/genres/TV%20Movie/10770"><p>TV Movie</p></NavLink>
          <NavLink className="genre" exact to="/genres/War/10752"><p>War</p></NavLink>
          <NavLink className="genre" exact to="/genres/Western/37"><p>Western</p></NavLink>
        </div>
        <NavLink exact to="/top-rated" ><li>Top rated</li></NavLink>
        <NavLink exact to="/upcoming" ><li>Upcoming</li></NavLink>
        <NavLink exact to="/trending-today" ><li>Trending today</li></NavLink>
        <NavLink exact to="/trending-week"><li>Trending week</li></NavLink>
        <NavLink exact to="/now-playing"><li>Now playing</li></NavLink>

        < RandomMovieGenerator API_KEY={API_KEY} className="mobile-hamburger-menu" />
        < Searchbar API_KEY={API_KEY} className="mobile-hamburger-menu" />

      </ul>

    </>
  )
}
