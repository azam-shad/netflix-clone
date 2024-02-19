import React, { useEffect, useState } from 'react'
import './admin.scss'
import Cards from '../assets/Cards';
import { faScrewdriverWrench, faUserCheck, faUserSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Box, Grid } from '@mui/material';
import RevenueStatistics from '../RevenueStatistics/RevenueStatistics';
import TrendingMovies from '../TrendingMovies/TrendingMovies';

const AdminDashboard = () => {
    // const [enableUserCount, setEnableUserCount] = useState(0);
    const [moviesCount, setMoviesCount] = useState(0)
    const [disableUsers, setDisableUsers] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [subscribers, setSubscribers] = useState(0);


    useEffect(() => {

        const fetchData = async () => {

            const responce = await fetch(`http://localhost:5000/adminData/counts`);
            if (responce.ok) {
                const data = await responce.json();
                setAdminCount(data.countsAdmin);
                setDisableUsers(data.disableUsers);
                setSubscribers(data.subscribed);
                setMoviesCount(data.countMovies)

            }
        }
        fetchData();

    }, [])

    return (

        <>
            <Box sx={{ flexGrow: 1, maxWidth: 'calc(100vw - 200px)', margin: '30px 10px 0 10px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Cards header='Total Movies' icons={faVideo} title={moviesCount} />
                    </Grid>
                    <Grid item xs={3}>
                        <Cards header='Admin users' icons={faScrewdriverWrench} title={adminCount} />
                    </Grid>
                    <Grid item xs={3}>
                        <Cards header='Subscribers' icons={faUserCheck} title={subscribers} />
                    </Grid>

                    <Grid item xs={3}>
                        <Cards header='Disable Subscribers' icons={faUserSlash} title={disableUsers} />
                    </Grid>
                    
                    <Grid item xs={9}>
                        {/* <Cards header='Total Movies' icons={faVideo} title={moviesCount} /> */}
                        <RevenueStatistics />
                    </Grid>
                    <Grid item xs={3}>
                        {/* <Cards header='Subscribers' icons={faUserCheck} title={subscribers} /> */}
                        <TrendingMovies />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <Cards header='Admin users' icons={faScrewdriverWrench} title={adminCount} /> */}
                        {/* <TrendingMovies /> */}
                    </Grid>
                    {/* <Grid item xs={3}>
                        <Cards header='Subscribers' icons={faUserCheck} title={subscribers} />
                    </Grid>
                    <Grid item xs={3}>
                        <Cards header='Disable Subscribers' icons={faUserSlash} title={disableUsers} />
                    </Grid> */}

                </Grid>
            </Box>
        </>

    )
}

export default AdminDashboard
