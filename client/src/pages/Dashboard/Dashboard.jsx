import React from 'react'
import MoviesGrid from '../assets/Common/MoviesGrid';
import data from '../assets/json/data.json'
// import Home from '../components/Home/Homes';

// import { useAuth } from '../Context/AuthContext';
// import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    // const { logout, isLoggedIn } = useAuth();

    // const userId = localStorage.getItem('user_id')
    // console.log(userId)


    return (
        <>
            {/* <NavBar /> */}
            {/* <MoviesGrid key={'key'} title={'Popular on Netflix'} images={'user.images'} subTitle={'more'} link={'user.link'} /> */}
            {
                data.PopularNetflix.map((user, key) => (
                    <MoviesGrid key={key} title={user.name} images={user.images} subTitle={user.subTitle} link={user.link} />

                ))
            }
            {
                data.trendingnow.map((user, key) => (
                    <MoviesGrid key={key} title={user.name} images={user.images} subTitle={user.subTitle} />

                ))
            }
            {
                data.tvshows.map((user, key) => (
                    <MoviesGrid key={key} title={user.name} images={user.images} subTitle={user.subTitle} link={user.link} />

                ))
            }
            {
                data.blockbusteractionadventure.map((user, key) => (
                    <MoviesGrid key={key} title={user.name} images={user.images} subTitle={user.subTitle} />

                ))
            }
            {
                data.netflixoriginals.map((user, key) => (
                    <MoviesGrid key={key} title={user.name} images={user.images} subTitle={user.subTitle} />

                ))
            }




        </>
    )
}

export default Dashboard
