import React from 'react'
import Login from "../components/Login"
import Contain from '../components/container/Contain'

function LoginPage() {
  return (
    <div className='flex items-center w-full bg-gray-600 min-h-[32rem]'>
    <Contain>
    <div className='flex justify-center'>
      <Login/>
    </div>
    </Contain>
    </div> 
  )
}

export default LoginPage
