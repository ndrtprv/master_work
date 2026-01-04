import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { LANDING_ROUTE } from '../utils/constants';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    axios.defaults.withCredentials = true;

    const checkAuth = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + 'user/nav');
            if (res.data.status) {
                setIsLoggedIn(true);
                setIsAdmin(res.data.isAdmin || false);
                setAvatar(res.data.portrait || null);
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
                setAvatar(null);
            }
        } catch (err) {
            console.log(err.message);
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logOut = async (navigate) => {
        try {
            const res = await axios.get('http://localhost:3003/user/logout');
            if (res.data.status) {
                setIsLoggedIn(false);
                setIsAdmin(false);
                setAvatar(null);
                navigate(LANDING_ROUTE);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, isAdmin, avatar, checkAuth, logOut, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};