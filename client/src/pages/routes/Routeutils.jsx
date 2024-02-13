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
    return (
        isAdminLogin ? (
            window.location.pathname === "/admin" ||
            window.location.pathname === "/admin/dashboard" ||
            window.location.pathname === "/admin/dashboard/users"
        ) : (
            <Navigate to={'/admin/login'} />
        )
    )
}
const showNavBar = (isLoggedIn) => {
    return (
        isLoggedIn && (
            window.location.pathname === '/dashboard/tvshows' ||
            window.location.pathname === '/dashboard/home' ||
            window.location.pathname === '/dashboard/profile' ||
            window.location.pathname === '/dashboard/setpassword' ||
            window.location.pathname === '/dashboard'
        )
    )
}

export { showNavBar, showHeaders, showAdmin }