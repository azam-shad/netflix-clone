import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../pages/Context/AuthContext';
import AdminSideNavBar from '../sideNavbar/AdminSideNavBar';
import PrivateRoute from '../../pages/routes/PrivateRoute';
import AdminUsers from '../profile/AdminUsers';
import View from '../usersView/View';
import MoviesUpload from '../upload/MoviesUpload';
import MoviesList from '../MoviesList/MoviesList';
import AdminDashboard from '../Dashboard/AdminDashboard';
import SingleViewMovies from '../MoviesList/SingleViewMovies';
// import '../../pages/utils/content.scss'
import './AdminRoutes.scss'

const AdminRoutes = () => {
    const { isAdminLogin } = useAuth();

    if (!isAdminLogin) {
        return <Navigate to="/admin/login" />;
    }

    return (
        <React.Fragment key="admin-fragment">
            <div id='contents'>
                <AdminSideNavBar />
                <Routes>
                    <Route exact
                        path={'dashboard'}
                        element={
                            isAdminLogin ? (
                                <PrivateRoute element={<AdminDashboard onUnauthorized={() => <Navigate to='/admin/login' />} />} />
                            ) : (
                                <Navigate to={'/admin/login'} />
                            )
                        }
                    />

                    <Route exact
                        path={'dashboard/users'}
                        element={
                            <PrivateRoute element={<AdminUsers onUnauthorized={() => <Navigate to='/admin/login' />} />} />
                        }
                    />

                    <Route exact
                        path={'dashboard/users/view/:userId'}
                        element={
                            <PrivateRoute element={<View onUnauthorized={() => <Navigate to='/admin/login' />} />} />
                        }
                    />

                    <Route exact
                        path={'dashboard/upload'}
                        element={
                            <PrivateRoute element={<MoviesUpload onUnauthorized={() => <Navigate to='/admin/login' />} />} />
                        }
                    />

                    <Route exact
                        path={'dashboard/movies-list'}
                        element={
                            <PrivateRoute element={<MoviesList onUnauthorized={() => <Navigate to='/admin/login' />} />} />
                        }
                    />

                    <Route exact
                        path={'dashboard/movies-list/edit/:movieId'}
                        element={
                            <PrivateRoute element={<SingleViewMovies onUnauthorized={() => <Navigate to='/admin/login' />} />} />
                        }
                    />

                </Routes>

            </div>
        </React.Fragment>
    );
};


export default AdminRoutes