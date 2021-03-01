import React from 'react'
import { useSelector } from 'react-redux'

const UserDetails = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <div>
      <div>My Name : {userInfo.name}</div>
      <div>My Email : {userInfo.email}</div>
    </div>
  )
}

export default UserDetails
