import React from 'react'
import Login from './_components/login'
import { getLoggedInUser } from '../api/appwriterapi'

const LoginPage = async () => {
  const user = await getLoggedInUser();
  return (
    <Login user={user} />
  )
}

export default LoginPage
