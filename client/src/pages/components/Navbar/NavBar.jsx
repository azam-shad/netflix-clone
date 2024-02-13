import React from 'react'
import netflixLogo from '../../assets/logo.png';
import './navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';

const NavBar = () => {
    const { logout } = useAuth();

    return (
        <div className='wrapper'>
            <div className='header'>
                <div className='netflixLogo'>
                    <NavLink to={'/dashboard'}>
                        <img src={netflixLogo} alt='netflix logos' />
                    </NavLink>
                </div>
                <div className='main-nav'>
                    <NavLink to='/dashboard'>Home</NavLink>
                    <NavLink to='/dashboard/tvshows'>TV Shows</NavLink>
                    <NavLink to='/dashboard' >Movies</NavLink>
                    <NavLink to='/dashboard' >Originals</NavLink>
                    <NavLink to='/dashboard' >Recently Added</NavLink>
                </div>
                <div className='sub-nav'>
                    <Link to='/search' ><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                    <NavLink to='/notification' ><FontAwesomeIcon icon={faBell} /></NavLink>
                    <Dropdown>
                        <Dropdown.Toggle>
                            Account
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to='/dashboard/profile'>Profile</Dropdown.Item>

                            <Dropdown.Divider className=' text-bg-danger' />
                            <Dropdown.Item as={NavLink} to={''} onClick={logout} >Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default NavBar
