import React from 'react'
import { UseContext } from '../context/ContextApi'
import { Navigate } from 'react-router-dom'
import HomeComMain from '../components/Employee/Home'



const Home = () => {

  const {isAuth} = UseContext()

  if (!isAuth) return <Navigate to={'/login'} />
  
  return (
    <>
      <HomeComMain/>
    </>
  )
}

export default Home