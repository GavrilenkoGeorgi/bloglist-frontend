import React from 'react'
import loginService from '../services/login'
import { useField } from '../hooks'

const LoginForm = ({ setUser, onError }) => {
  const { reset : resetName, ...username } = useField('text')
  const { reset : resetPass, ...password } = useField('password')

  const loginUser = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username : username.value, password : password.value })
      setUser(user)
    } catch (exception) {
      onError(`Wrong credentials: ${exception.message}`)
      setTimeout(() => {
        onError(null)
      }, 5000)
    }
    resetName('')
    resetPass('')
  }

  return <form data-testid="login-form" onSubmit={loginUser}>
    <h4>Login into application</h4>
    <div>
      username
      <input
        {...username}
      />
    </div>
    <div>
      password
      <input
        {...password}
        name="Password"
      />
    </div>
    <button type="submit">login</button>
  </form>
}

export default LoginForm
