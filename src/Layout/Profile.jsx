import React from 'react'
import User from './Profile/User.Jsx'
import Writer from './Profile/Writer'

const Profile = () => {
  return localStorage.getItem('role') === 'user' ? <User /> : <Writer />
}

export default Profile
