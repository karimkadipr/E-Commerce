import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../actions/userActions.js'
import { Input } from '@material-ui/core'
import './styles/signUpScreen.css'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const SignUpScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()

  const userLoginId = useSelector((state) => state.userLogin)
  const { userInfo, success } = userLoginId

  useEffect(() => {
    if (userInfo) {
      window.history.back()
    }
  }, [history, dispatch, success, userInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(registerUser(email, password, name))
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className='sign_up_screen_container'>
      <h3>Create Account</h3>
      <form className='form_sign_up' onSubmit={handleSubmit}>
        <div className='input_sign_up_container'>
          <Input
            type='text'
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your Name'
            fullWidth={true}
          />
        </div>
        <div className='input_sign_up_container'>
          <Input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'
            fullWidth={true}
          />
        </div>
        <div className='input_sign_up_container'>
          <Input
            id='standard-adornment-password'
            placeholder='Enter your Password'
            fullWidth={true}
            type={showPassword ? 'text' : 'password'}
            value={password}
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
        <div className='input_sign_up_container'>
          <Input
            id='standard-adornment-password'
            placeholder='Enter your Password'
            fullWidth={true}
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <button className='submit_sign_up_button' type='submit'>
          submit
        </button>
      </form>
      <h4>
        Already have an account? <Link to='/login'>Sign-In</Link>
      </h4>
    </div>
  )
}

export default SignUpScreen
