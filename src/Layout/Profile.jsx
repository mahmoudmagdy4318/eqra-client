
import React from 'react'
import User from './profile/User'
import Writer from './profile/Writer'
import Home from './Home'


const Profile = () => {
  return localStorage.getItem('role') === 'user' ? <User /> : <Writer />

}


export default Home(Profile);
