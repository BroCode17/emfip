import React from 'react'
import SignupPage from './_components/signup'
import { getLoggedInUser } from '../api/appwriterapi'

const SignUpPage = async () => {
  const user = await getLoggedInUser();
  return (
    <SignupPage user={user} />
  )
}

export default SignUpPage
