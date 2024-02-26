import React from 'react'
import logo from '../assets/userImage/logo.png'
import './headers.scss'
import Background from '../background/Background'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Headers = () => {
    const { logout, isLoggedIn } = useAuth();
    return (
        <>
            <Background />
            <div className='header'>
                <div className='logo'>
                    <Link to={'/'}><img src={logo} alt='Compony Logo' /></Link>
                </div>
                {!window.location.pathname.includes('/register') && !window.location.pathname.includes('/login') && (
                    isLoggedIn ? (
                        <button className=' text-decoration-none text-white' onClick={logout} >
                            Logout
                        </button>
                    ) : <button >
                        <Link to={'/login'} className='text-decoration-none text-white' >Login</Link>
                    </button>
                )}
            </div>
        </>
    )
}

export default Headers
