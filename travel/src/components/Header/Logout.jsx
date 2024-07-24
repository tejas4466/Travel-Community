import React from 'react'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router'
function Logout() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const logoutHandler=async()=>{
        await authService.logout()
        dispatch(logout())
        navigate("/")
    }




  return (
    <Button
    type="submit"
    bgColor = ""
    textColor = "text-white"
    onClick={logoutHandler}
    className='flex items-center text-sm md:bg-gray-800 md:hover:bg-gray-700'
    >
        Logout
    </Button>
  )
}

export default Logout
