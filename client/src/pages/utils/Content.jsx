import React from 'react';
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
import AdminDasboard from '../../Admin/Dashboard/AdminDasboard';
import AdminLogin from '../../Admin/Login/AdminLogin';
import AdminSideNavBar from '../../Admin/sideNavbar/AdminSideNavBar';
import './content.scss'
import AdminUsers from '../../Admin/profile/AdminUsers';
import View from '../../Admin/usersView/View';
import MoviesUpload from '../../Admin/upload/MoviesUpload';
import MoviesList from '../../Admin/MoviesList/MoviesList';


const Content = () => {
    const { isLoggedIn, isAdminLogin } = useAuth();
    return (
        <>
            {/* client side route start */}
            {showHeaders(isLoggedIn) && <Headers />}
            {showNavBar(isLoggedIn) && <NavBar />}
            <Routes>
                <Route exact
                    path={'/'}
                    element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />}
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
                    element={<PrivateRoute element={<Dashboard onUnauthorized={() => <Navigate to='/login' />} />} />}
                />
                <Route exact
                    path={'/dashboard/tvshows'}
                    element={<PrivateRoute element={<TvShows onUnauthorized={() => <Navigate to='/login' />} />} />}
                />
                <Route exact
                    path={'/dashboard/home'}
                    element={<PrivateRoute element={<Homes onUnauthorized={() => <Navigate to='/login' />} />} />}
                />
                <Route exact
                    path={'/dashboard/profile'}
                    element={<PrivateRoute element={<Profiles onUnauthorized={() => <Navigate to='/login' />} />} />}
                />
                <Route exact
                    path={'/dashboard/setpassword'}
                    element={<PrivateRoute element={<ChangePassword onUnauthorized={() => <Navigate to='/login' />} />} />}
                />
                <Route
                    index
                    path={'/admin'}
                    element={isAdminLogin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
                />
                <Route
                    exact
                    path={'/admin/login'}
                    element={isAdminLogin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
                />
                {/* {isAdminLogin && (
                    <React.Fragment >
                        <div className='contents'>
                            <AdminSideNavBar />
                            <Route path={"/admin/*"}>
                                <Routes>
                                    <Route
                                        index
                                        path={"dashboard"}
                                        element={<PrivateRoute element={<AdminDasboard onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                                    />
                                    <Route
                                        path={"dashboard/users"}
                                        element={<PrivateRoute element={<AdminUsers onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                                    />
                                </Routes>
                            </Route>
                        </div>
                    </React.Fragment>
                )} */}
                {showAdmin && (
                    <>
                        <Route
                            path="/admin/*"
                            element={
                                <React.Fragment key="admin-fragment">
                                    <div className='contents'>
                                        <AdminSideNavBar />
                                        <Routes>
                                            <Route
                                                index
                                                path={"dashboard"}
                                                element={<PrivateRoute element={<AdminDasboard onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                                            />
                                            <Route
                                                path={"dashboard/users"}
                                                element={<PrivateRoute element={<AdminUsers onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                                            />
                                            <Route
                                                path={"dashboard/users/view/:userId"}
                                                element={<PrivateRoute element={<View onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                                            />
                                            <Route
                                                path={"dashboard/upload"}
                                                element={<PrivateRoute element={<MoviesUpload onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                                            />
                                            <Route
                                                path={"dashboard/movies-list"}
                                                element={<PrivateRoute element={<MoviesList onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                                            />
                                            {/* Other admin-specific routes */}
                                        </Routes>
                                    </div>
                                </React.Fragment>
                            }
                        />
                    </>
                )}
            </Routes>
            {/* clent side route end */}

            {/* admin side route start */}
            {/* {
                    <div className='contents'>
                        {showAdmin(isAdminLogin) && <AdminSideNavBar />}

                        <Route
                            exact
                            path={"/admin/dashboard"}
                            element={<PrivateRoute element={<AdminDasboard onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                        />
                        <Route
                            exact
                            path={'/admin/dashboard/users'}
                            element={<PrivateRoute element={<AdminUsers onUnauthorized={() => <Navigate to='/admin/login' />} />} />}
                        />
                    </div>

                } */}

            {/* admin side route end */}
        </>
    )
}

export default Content
