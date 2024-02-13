import React, { useEffect, useState } from 'react'
import './admin.scss'
import Cards from '../assets/Cards';
import { faScrewdriverWrench, faUserCheck, faUserSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
// const userId = localStorage.getItem('user_id');

const AdminDasboard = () => {
    // const [enableUserCount, setEnableUserCount] = useState(0);
    const [moviesCount, setMoviesCount] = useState(0)
    const [disableUsers, setDisableUsers] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [subscribers, setSubscribers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            const responce = await fetch(`http://localhost:5000/adminData/counts`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
            });
            if (responce.ok) {
                const data = await responce.json();
                setAdminCount(data.countsAdmin);
                setDisableUsers(data.disableUsers);
                setSubscribers(data.subscribed);
                setMoviesCount(data.countMovies)

            }
        }
        fetchData();
    })
    return (

        <>
            <div className='text-white allStyle dashboard'>
                <Cards header='Total Movies' icons={faVideo} title={moviesCount} />
                <Cards header='Admin users' icons={faScrewdriverWrench} title={adminCount} />
                <Cards header='Subscribers' icons={faUserCheck} title={subscribers} />
                <Cards header='Disable Subscribers' icons={faUserSlash} title={disableUsers} />


            </div>
        </>

    )
}

export default AdminDasboard
