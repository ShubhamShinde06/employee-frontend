import React from 'react'
import { UseContext } from '../context/ContextApi'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {user} = UseContext()

  return user ? children : <Navigate to='/login'/>
}

export default PrivateRoute