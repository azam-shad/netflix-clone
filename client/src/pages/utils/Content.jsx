import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Headers from '../headers/Headers';
import Login from '../login/Login';
import Home from '../Home/Home';
import TvShows from '../components/tvShows/TvShows';
import Dashboard from '../Dashboard/Dashboard';
import { useAuth } from '../Context/AuthContext';
import PrivateRoute from '../routes/PrivateRoute';
import NavBar from '../components/Navbar/NavBar';
import Homes from '../components/Home/Homes';
import { showHeaders, showNavBar, showAdmin } from '../routes/Routeutils';
import Profiles from '../components/Accounts/Profiles';
import ChangePassword from '../components/Accounts/ChangePassword';
import NewUser from '../login/NewUser';
import AdminLogin from '../../Admin/Login/AdminLogin';
import './content.scss';
import Loders from '../assets/Common/Loders';
import AdminRoutes from '../../Admin/AdminRoutes/AdminRoutes';

const Content = () => {
    const { isLoggedIn, isAdminLogin } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <Loders />
        );
    }

    return (
        <>
            {/* client side route start */}
            {showHeaders(isLoggedIn) && <Headers />}
            {showNavBar(isLoggedIn) && <NavBar />}

            <Routes>
                <Route exact
                    path={'/'}
                    element={
                        isLoggedIn ? (
                            <Navigate to='/dashboard' />
                        ) : (
                            <Home />
                        )
                    }
                />
                <Route exact
                    path={'/login'}
                    element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
                />
                <Route exact
                    path={'/register'}
                    element={isLoggedIn ? <Navigate to="/dashboard" /> : <NewUser />}
                />
                <Route exact
                    path={'/dashboard'}
                    element={
                        isLoggedIn ? (
                            <PrivateRoute element={<Dashboard onUnauthorized={() => <Navigate to='/login' />} />} />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route exact
                    path={'/dashboard/tvshows'}
                    element={
                        isLoggedIn ? (
                            <PrivateRoute element={<TvShows onUnauthorized={() => <Navigate to='/login' />} />} />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route exact
                    path={'/dashboard/home'}
                    element={
                        isLoggedIn ? (
                            <PrivateRoute element={<Homes onUnauthorized={() => <Navigate to='/login' />} />} />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route exact
                    path={'/dashboard/profile'}
                    element={
                        isLoggedIn ? (
                            <PrivateRoute element={<Profiles onUnauthorized={() => <Navigate to='/login' />} />} />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route exact
                    path={'/dashboard/setpassword'}
                    element={
                        isLoggedIn ? (
                            <PrivateRoute element={<ChangePassword onUnauthorized={() => <Navigate to='/login' />} />} />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />

                <Route
                    exact
                    path={'/admin'}
                    element={isAdminLogin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
                />
                <Route
                    exact
                    path={'/admin/login'}
                    element={isAdminLogin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
                />

                {showAdmin && (
                    <Route path="/admin/*" element={<AdminRoutes />} />
                )}
            </Routes>
        </>
    );
}

export default Content