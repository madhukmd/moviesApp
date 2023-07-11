import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    error: false,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({errMsg, error: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="input-container">
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          className="username-password-field"
          onChange={this.usernameChange}
          placeholder="username:rahul"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="username-password-field"
          onChange={this.passwordChange}
          placeholder="password:rahul@2021"
        />
      </div>
    )
  }

  render() {
    const {error, errMsg} = this.state
    return (
      <div className="Login-bg-container">
        <img
          src="https://res.cloudinary.com/dtpjzzexl/image/upload/v1688307049/Group_7399_gtyxb6.png"
          alt="login website logo"
          className="movies-logo"
        />
        <form className="login-form-container" onSubmit={this.submitForm}>
          <h1 className="login-heading">Login</h1>
          {this.renderUsername()}
          {this.renderPassword()}
          {error && <p className="error-message">{errMsg} </p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
