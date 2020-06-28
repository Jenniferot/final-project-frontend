import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { user, handleSignup } from '../components/reducers/user';
import { Accountheader } from '../components/LoginRegister/Accountheader'
import { Linksection } from '../components/LoginRegister/Linksection'
import { Errormessage } from '../components/LoginRegister/Errormessage'

export const Register = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()

  console.log("error message", errorMessage)
  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmedPassword) {
      setErrorMessage("Passwords do not match")
    } else {
      dispatch(handleSignup(name, email, password, setErrorMessage))
    }
  }

  return (
    <section className="login-register-container">
      <section className="login-register">

        < Accountheader title="Register new account" />

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

          <label for="email">
            <p>
              E-mail
          </p>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
              required>
            </input>
          </label>

          <label for="password">
            <p>
              Password
          </p>
            <input
              minLength="6"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              required>
            </input>
          </label>

          <label for="confirmed-password">
            <p>
              Confirm password
          </p>

            <input
              value={confirmedPassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
              type="password"
              id="confirmed-password"
              required>
            </input>
          </label>

          {errorMessage &&
            < Errormessage errormessage={errorMessage} />
          }

          <button type="submit">
            CREATE USER
          </button>
        </form>

        < Linksection className="sign-in-link-title" title="Already got an account?" link="/signin" linkTitle="Sign in" />

      </section>
    </section>
  )
}
