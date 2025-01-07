import React from 'react'
import { UseContext } from '../context/ContextApi'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children, requiredRole}) => {
 
    const {user} = UseContext()

    if(requiredRole.includes(user.role)){
        <Navigate to="/" />
    }

    return user ? children : <Navigate to="/login" />

}

export default AuthRoute