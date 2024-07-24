import React from 'react'
import Signup from '../components/Signup'
import Contain from '../components/container/Contain'
function SignupPage() {
  return (
    <div className='flex items-center w-full bg-gray-600 min-h-[38rem]'>
    <Contain>
    <div className='flex justify-center'>
      <Signup/>
    </div>
    </Contain>
    </div> 
  )
}

export default SignupPage
