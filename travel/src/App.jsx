import React, { useState, useEffect } from 'react'
import Header from "./components/Header/Header"
import Foot from "./components/Footer/Foot"
import { Outlet } from "react-router"
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/authSlice"
import authService from './appwrite/auth'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    // alert("App running user data fetching")
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [login])
  
  return !loading ?(
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Foot/>
    </>
  ):null
}

export default App
