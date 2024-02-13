import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const PrivateRoute = ({ element }) => {
    const { isLoggedIn, isAdminLogin } = useAuth();
    const redirectPath = isAdminLogin ? '/login' : '/admin/login';


    return (
        <>
            {isLoggedIn || isAdminLogin ? element : <Navigate to={redirectPath} state={{ from: window.location.pathname }} />}
        </>
    )
}

export default PrivateRoute
