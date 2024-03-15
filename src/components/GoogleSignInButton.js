import React from 'react'
import { Button } from './ui/button'

const GoogleSignInButton = ({children}) => {
  const loginWithGoogle=()=>{}
  return (
   <Button className='w-full' onClick={loginWithGoogle}>{children}</Button>
  )
}

export default GoogleSignInButton