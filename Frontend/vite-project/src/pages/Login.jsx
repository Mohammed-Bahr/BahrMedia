import React from 'react'
import { SignIn } from '@clerk/clerk-react'
export const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-linear from-gray-900 via-gray-600 to-gray-300'>
        <SignIn  />
    </div>
  )
}
