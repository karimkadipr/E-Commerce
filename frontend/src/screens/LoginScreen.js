import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../actions/userActions.js'
import { Link } from 'react-router-dom'
import { Input } from '@material-ui/core'
import './styles/loginScreen.css'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const LoginScreen = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLoginId = useSelector((state) => state.userLogin)
  const { userInfo, error, success } = userLoginId

  useEffect(() => {
    if (userInfo || success) {
      window.history.back()
    }
  }, [history, dispatch, success, userInfo])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(userLogin(email, password))
  }
  return (
    <div className='login_screen_container'>
      <h3>Sign In</h3>
      {error && <div className='error_login'>{error}</div>}
      <form className='form' onSubmit={handleSubmit}>
        <div className='input_container'>
          <Input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'
            error={error}
            fullWidth={true}
          />
        </div>
        <div className='input_container'>
          <Input
            id='standard-adornment-password'
            placeholder='Enter your Password'
            fullWidth={true}
            type={showPassword ? 'text' : 'password'}
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <button className='submit_button' type='submit'>
          Submit
        </button>
      </form>
      <p>
        No account? <Link to='/signup'>Create One!</Link>
      </p>
    </div>
  )
}

export default LoginScreen
