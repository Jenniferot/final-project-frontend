import React, { useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { user } from './components/reducers/user'
import { Navbar } from './components/Navbar/Navbar'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'
import dotenv from 'dotenv'
import { MovieItem } from './pages/MovieItem'
import { ActorPage } from './pages/ActorPage'
import { MovieSlider } from './components/MovieSlider'
import { ViewMoreMovies } from './pages/ViewMoreMovies'
import layingPlaceholder from './images/placeholderL.png'
import standingPlaceholder from './images/placeholderS.png'
import { MovieSearchResults } from './pages/MovieSearchResults'
import { ActorSearchResults } from './pages/ActorSearchResults'

dotenv.config()

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer: reducer })

export const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [loggedIn, setLoggedIn] = useState(false)

  return (

    <Provider store={store}>
      <BrowserRouter>

        < Navbar loggedIn={loggedIn} API_KEY={API_KEY} />

        <Switch>

          {/* start page components below*/}

          <Route exact path="/" >
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`}
              fetchtitle="Trending today"
              imageOrientation="standing"
              placeholder={standingPlaceholder}
              titlelink="/trending-today"
            />

            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`}
              fetchtitle="Trending this week"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/trending-week"
            />

            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`}
              fetchtitle="Now playing"
              placeholder={layingPlaceholder}
              imageOrientation="laying"
              titlelink="/now-playing"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`}
              fetchtitle="Top rated"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/top-rated"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`}
              fetchtitle="Upcoming"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/upcoming"
            />
          </Route>

          {/* Genre routes below  */}

          <Route exact path="/genres" >
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=36`}
              fetchtitle="History"
              placeholder={layingPlaceholder}
              imageOrientation="laying"
              titlelink="/genres/history/36"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=16`}
              fetchtitle="Animation"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/genres/animation/16"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10402`}
              fetchtitle="Music"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/music/10402"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=35`}
              fetchtitle="Comedy"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/comedy/35"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28`}
              fetchtitle="Action"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/genres/action/28"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=12`}
              fetchtitle="Adventure"
              placeholder={layingPlaceholder}
              imageOrientation="laying"
              titlelink="/genres/adventure/12"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=80`}
              fetchtitle="Crime"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/genres/crime/80"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=99`}
              fetchtitle="Documentary"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/documentary/99"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=18`}
              fetchtitle="Drama"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/drama/18"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10751`}
              fetchtitle="Family"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/genres/family/10751"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=14`}
              fetchtitle="Fantasy"
              placeholder={layingPlaceholder}
              imageOrientation="laying"
              titlelink="/genres/fantasy/14"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=27`}
              fetchtitle="Horror"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/genres/horror/27"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=9648`}
              fetchtitle="Mystery"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/mystery/9648"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10749`}
              fetchtitle="Romance"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/romance/10749"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28`}
              fetchtitle="Science-Fiction"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/genres/science_fiction/28"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=53`}
              fetchtitle="Thriller"
              placeholder={layingPlaceholder}
              imageOrientation="laying"
              titlelink="/genres/thriller/53"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10770`}
              fetchtitle="TV-movie"
              placeholder={standingPlaceholder}
              imageOrientation="standing"
              titlelink="/genres/TV_movie/10770"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10752`}
              fetchtitle="War"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/war/10752"
            />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=37`}
              fetchtitle="Western"
              imageOrientation="laying"
              placeholder={layingPlaceholder}
              titlelink="/genres/western/37"
            />
          </Route>

          <Route exact path='/genres/:genreName/:genreId' >
            < ViewMoreMovies
              API_KEY={API_KEY}
              placeholder={standingPlaceholder}
              loggedIn={loggedIn}
              type="genres"
            />
          </Route>

          {/* misc routes below */}

          <Route exact path='/now-playing' >
            < ViewMoreMovies
              API_KEY={API_KEY}
              loggedIn={loggedIn}
              fetchtitle="Now playing"
              placeholder={standingPlaceholder}
              type="now-playing"
            />
          </Route>

          <Route exact path='/upcoming' >
            < ViewMoreMovies
              API_KEY={API_KEY}
              loggedIn={loggedIn}
              fetchtitle="Upcoming"
              placeholder={standingPlaceholder}
              type="upcoming"
            />
          </Route>

          <Route exact path='/top-rated' >
            < ViewMoreMovies
              API_KEY={API_KEY}
              loggedIn={loggedIn}
              fetchtitle="Top rated"
              placeholder={standingPlaceholder}
              type="top-rated"
            />
          </Route>

          <Route exact path='/trending-week' >
            < ViewMoreMovies
              API_KEY={API_KEY}
              loggedIn={loggedIn}
              fetchtitle="Trending this week"
              placeholder={standingPlaceholder}
              type="trending-week"
            />
          </Route>

          <Route exact path='/trending-today' >
            < ViewMoreMovies
              API_KEY={API_KEY}
              loggedIn={loggedIn}
              fetchtitle="Trending today"
              placeholder={standingPlaceholder}
              type="trending-today"
            />
          </Route>

          <Route exact path='/similar-movies/:movieId' >
            < ViewMoreMovies
              API_KEY={API_KEY}
              loggedIn={loggedIn}
              fetchtitle="Similar movies"
              placeholder={standingPlaceholder}
              type="similar-movies"
            />
          </Route>

          <Route exact path="/movie/:id" >
            < MovieItem API_KEY={API_KEY} loggedIn={loggedIn} />
          </Route>

          <Route exact path="/actor/:id" >
            < ActorPage API_KEY={API_KEY} loggedIn={loggedIn} />
          </Route>

          {/* SEARCH RESULTS PAGES */}

          <Route exact path='/search-results/movie/:value' >
            < MovieSearchResults API_KEY={API_KEY} loggedIn={loggedIn} />
          </Route>

          <Route exact path='/search-results/actor/:value' >
            < ActorSearchResults API_KEY={API_KEY} loggedIn={loggedIn} />
          </Route>

          {/* routes for user signin/register/profilepage */}

          <Route exact path='/signin' >
            {loggedIn ? <Redirect to='/profile' /> : < Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Route>

          <Route exact path='/register' >
            < Register />
          </Route>

          <Route exact path='/profile' >
            {!loggedIn ? <Redirect to='/signin' /> : < Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Route>

        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

