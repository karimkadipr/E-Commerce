import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  adminGetUserDetails,
  adminUpdateUserDetails,
} from '../actions/userActions'
import { Input, FormControl, InputLabel } from '@material-ui/core'
import './styles/adminUserDetails.css'
import { UPDATE_USER_BY_ID_RESET } from '../constants/userConstants'

const AdminUserDetails = ({ match, history }) => {
  const userID = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()

  const adminGetUser = useSelector((state) => state.adminGetUser)
  const { user, success } = adminGetUser

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser)
  const { success: updateSuccess } = adminUpdateUser

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_USER_BY_ID_RESET })
      history.push('/admin/users')
    } else {
      if (!user) {
        dispatch(adminGetUserDetails(userID))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, userID, success, updateSuccess, user, history])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      adminUpdateUserDetails(
        {
          name,
          email,
          password,
        },
        match.params.id
      )
    )
  }

  return (
    <div>
      {user && <div></div>}
      <div className='update_user_container'>
        <form className='form_user_container' onSubmit={handleSubmit}>
          <div className='update_user_admin_input'>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='my-input'>Name</InputLabel>
              <Input
                type='text'
                value={name}
                fullWidth={true}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </div>
          <div className='update_user_admin_input'>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='my-input'>Email</InputLabel>
              <Input
                type='text'
                value={email}
                fullWidth={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </div>
          <div className='update_user_admin_input'>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='my-input'>Password</InputLabel>
              <Input
                type='text'
                value={password}
                fullWidth={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </div>
          <div className='update_user_admin_input'>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='my-input'>Confirm Password</InputLabel>
              <Input
                type='text'
                value={confirmPassword}
                fullWidth={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </div>
          <button className='submit_user_button' type='submit'>
            UPDATE
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminUserDetails
