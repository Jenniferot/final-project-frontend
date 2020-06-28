import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../components/reducers/user'
import { Linksection } from '../components/LoginRegister/Linksection'
import { Accountheader } from '../components/LoginRegister/Accountheader'
import { Errormessage } from '../components/LoginRegister/Errormessage'

export const Login = ({ setLoggedIn }) => {

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(handleLogin(name, password, setErrorMessage, setLoggedIn))
  }

  return (
    <section className="login-register-container">
      <section className="login-register">

        < Accountheader title="Sign in to account" />

        <form onSubmit={(event) => handleSubmit(event)}>
          <label for="username">
            <p>
              Username
          </p>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              id="username"
              required>
            </input>
          </label>

          <label for="password">
            <p>
              Password
          </p>

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              required>
            </input>
          </label>

          {errorMessage &&
            < Errormessage errormessage={errorMessage} />
          }

          <button type="submit"> SIGN IN </button>

        </form>

        < Linksection title="New user? " link="/register" linkTitle="Register new account" />

      </section>
    </section>

  )
}