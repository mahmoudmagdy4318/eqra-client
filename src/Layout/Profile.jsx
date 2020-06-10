import React from 'react'
import Writer from './Profile/Writer'
import User from './Profile/User'

const Profile = () => {
  return localStorage.getItem('role') === 'user' ? <User /> : <Writer />
}

export default Profile
