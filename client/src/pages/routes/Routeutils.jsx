import { Navigate } from "react-router-dom"

const showHeaders = (isLoggedIn) => {

    return (
        !isLoggedIn && (
            window.location.pathname === '/login' ||
            window.location.pathname === '/register' ||
            window.location.pathname === '/'
        )
    )

}
const showAdmin = (isAdminLogin) => {
    console.log("window location", window.location.pathname)
    // return true;
    return (
        isAdminLogin ? (
            window.location.pathname === "/admin" ||
            window.location.pathname === "/admin/dashboard" ||
            window.location.pathname === "/admin/dashboard/users" ||
            window.location.pathname === "/admin/dashboard/upload" ||
            window.location.pathname === "/admin/dashboard/movies-list"

        ) : (
            <Navigate to={'/admin/login'} />
        )
    )
}
const showNavBar = (isLoggedIn) => {
    return (
        isLoggedIn && (
            window.location.pathname === '/dashboard' ||
            window.location.pathname === '/dashboard/home' ||
            window.location.pathname === '/dashboard/tvshows' ||
            window.location.pathname === '/dashboard/profile' ||
            window.location.pathname === '/dashboard/setpassword'
        )
    )
}

export { showNavBar, showHeaders, showAdmin }