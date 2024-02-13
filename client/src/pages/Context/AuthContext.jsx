import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [UserId, setUserId] = useState();
    const [isAdminLogin, setIsAdminLogin] = useState(false)
    const history = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const adminStoredToken = localStorage.getItem('admintoken');

        if (storedToken) {
            setIsLoggedIn(true);
        }
        if (adminStoredToken) {
            setIsAdminLogin(true);
        }

    }, []);

    const login = (token) => {
        setIsLoggedIn(true);
        localStorage.setItem('token', token);
    }
    const adminLogin = (admintoken) => {
        setIsAdminLogin(true);
        localStorage.setItem('admintoken', admintoken)
    }
    const logout = () => {
        // Perform your logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.clear()
        sessionStorage.clear();
        setIsLoggedIn(false);
        history('/login');

    };
    const adminLogout = () => {
        // Perform your logout logic here
        localStorage.removeItem('admintoken');
        localStorage.removeItem('user_id');
        localStorage.clear()
        sessionStorage.clear();
        setIsAdminLogin(false);
        history('/admin/login');

    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, adminLogin, isAdminLogin, adminLogout }}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}